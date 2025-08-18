# Shipping Validation System Documentation

## Overview

This document outlines our shipping validation system architecture, configuration format, and implementation guidelines. The system uses a dimension-driven approach to validate packages against carrier constraints and automatically select optimal shipping methods.

## Table of Contents

- [ServiceConfig Interface](#serviceconfig-interface)
- [Validation Types](#validation-types)
- [Combined Dimensions Calculations](#combined-dimensions-calculations)
- [Implementation Examples](#implementation-examples)
- [Carrier-Specific Rules](#carrier-specific-rules)
- [Migration from Legacy Rules](#migration-from-legacy-rules)

---

## ServiceConfig Interface

All shipping services are defined using a standardized configuration format:

```typescript
interface ServiceConfig {
  service_id: string;                    // Unique identifier (e.g., 'evri_48_packets')
  service_name: string;                  // Display name (e.g., 'EVRI 48 Packets')
  carrier: string;                       // Carrier code (e.g., 'EVRI')
  validation_type: 'box_fit' | 'dimension_limits' | 'oversized';
  constraints: {
    // Weight constraints
    weight_max_g?: number;               // Maximum weight in grams
    weight_min_g?: number;               // Minimum weight in grams
    
    // Dimensional constraints
    box_dimensions_mm?: number[];        // Fixed box dimensions [L, W, H] in mm
    box_dimensions_min_mm?: number[];    // Minimum box dimensions [L, W, H] in mm
    max_single_dimension_mm?: number;    // Maximum single dimension in mm
    max_combined_dimensions_mm?: number; // Maximum combined dimensions in mm
    
    // Combined dimension calculation method
    combined_calculation_method?: 'standard_sum' | 'length_plus_girth' | 'circumference' | 'custom';
    
    // Advanced constraints (oversized services)
    max_girth_mm?: number;               // Maximum girth in mm
    max_length_plus_girth_mm?: number;   // Maximum length + girth in mm
  };
}
```

---

## Validation Types

### 1. Box Fit (`box_fit`)

**Use when**: Service specifies exact box dimensions that packages must fit within.

**Logic**: Package must physically fit inside the specified box dimensions.

```typescript
// Example: EVRI 48 Packets
{
  service_id: 'evri_48_packets',
  validation_type: 'box_fit',
  constraints: {
    weight_max_g: 999,
    box_dimensions_mm: [350, 230, 30]  // 35cm × 23cm × 3cm
  }
}
```

**Validation Code**:
```typescript
function validateBoxFit(package: Package, boxDimensions: number[]): boolean {
  const packageDims = [package.length, package.width, package.height].sort((a, b) => a - b);
  const boxDims = boxDimensions.sort((a, b) => a - b);
  return packageDims.every((dim, i) => dim <= boxDims[i]);
}
```

### 2. Dimension Limits (`dimension_limits`)

**Use when**: Service has maximum single dimension and/or combined dimension limits.

**Logic**: Package must not exceed individual or total dimensional constraints.

```typescript
// Example: EVRI 48 Parcels
{
  service_id: 'evri_48_parcels',
  validation_type: 'dimension_limits',
  constraints: {
    weight_max_g: 15000,
    max_single_dimension_mm: 1200,           // Max 120cm on any side
    max_combined_dimensions_mm: 2250,        // L+W+H ≤ 225cm
    combined_calculation_method: 'standard_sum'
  }
}
```

**Validation Code**:
```typescript
function validateDimensionLimits(package: Package, constraints: Constraints): boolean {
  const maxDim = Math.max(package.length, package.width, package.height);
  if (constraints.max_single_dimension_mm && maxDim > constraints.max_single_dimension_mm) {
    return false;
  }
  
  if (constraints.max_combined_dimensions_mm) {
    const combined = calculateCombinedDimensions(
      package, 
      constraints.combined_calculation_method || 'standard_sum'
    );
    return combined <= constraints.max_combined_dimensions_mm;
  }
  
  return true;
}
```

### 3. Oversized (`oversized`)

**Use when**: Service has complex constraints including girth calculations or multiple interrelated limits.

**Logic**: Handles complex dimensional calculations for large packages.

```typescript
// Example: EVRI Light & Large
{
  service_id: 'evri_light_large',
  validation_type: 'oversized',
  constraints: {
    weight_max_g: 30000,
    max_single_dimension_mm: 1800,           // Max 180cm length
    max_girth_mm: 2400,                      // Max 240cm girth
    max_length_plus_girth_mm: 4200          // Max 420cm (length + girth)
  }
}
```

**Validation Code**:
```typescript
function validateOversized(package: Package, constraints: Constraints): boolean {
  const sortedDims = [package.length, package.width, package.height].sort((a, b) => b - a);
  const maxDim = sortedDims[0];
  const girth = 2 * (sortedDims[1] + sortedDims[2]);
  
  if (constraints.max_single_dimension_mm && maxDim > constraints.max_single_dimension_mm) {
    return false;
  }
  
  if (constraints.max_girth_mm && girth > constraints.max_girth_mm) {
    return false;
  }
  
  if (constraints.max_length_plus_girth_mm && (maxDim + girth) > constraints.max_length_plus_girth_mm) {
    return false;
  }
  
  return true;
}
```

---

## Combined Dimensions Calculations

⚠️ **CRITICAL**: Different carriers use different methods to calculate "combined dimensions". Always specify the calculation method to ensure correct validation.

### Standard Sum (`standard_sum`)

**Formula**: `Length + Width + Height`

**Used by**: EVRI, Amazon, Royal Mail, DHL (most services)

```typescript
function standardSum(length: number, width: number, height: number): number {
  return length + width + height;
}
```

**Example**: EVRI Parcels limit of 225cm means L+W+H ≤ 2250mm

### Length Plus Girth (`length_plus_girth`)

**Formula**: `Length + 2×(Width + Height)` where Length is the longest dimension

**Used by**: UPS, FedEx, USPS (US carriers)

```typescript
function lengthPlusGirth(length: number, width: number, height: number): number {
  const sortedDims = [length, width, height].sort((a, b) => b - a);
  const girth = 2 * (sortedDims[1] + sortedDims[2]);
  return sortedDims[0] + girth;
}
```

**Example**: UPS limit of 400cm means Length + 2×(Width + Height) ≤ 4000mm

### Circumference (`circumference`)

**Formula**: Various custom calculations (carrier-specific)

**Used by**: DPD, PostNord, regional carriers

```typescript
function circumference(length: number, width: number, height: number): number {
  // Example: Length + 2×Width + 2×Height
  const sortedDims = [length, width, height].sort((a, b) => b - a);
  return sortedDims[0] + 2 * sortedDims[1] + 2 * sortedDims[2];
}
```

### Universal Calculation Function

```typescript
enum CombinedDimensionMethod {
  STANDARD_SUM = 'standard_sum',
  LENGTH_PLUS_GIRTH = 'length_plus_girth',
  CIRCUMFERENCE = 'circumference',
  CUSTOM = 'custom'
}

class DimensionCalculator {
  static calculate(
    method: CombinedDimensionMethod,
    length: number, 
    width: number, 
    height: number
  ): number {
    switch (method) {
      case CombinedDimensionMethod.STANDARD_SUM:
        return length + width + height;
      case CombinedDimensionMethod.LENGTH_PLUS_GIRTH:
        const sortedDims = [length, width, height].sort((a, b) => b - a);
        const girth = 2 * (sortedDims[1] + sortedDims[2]);
        return sortedDims[0] + girth;
      case CombinedDimensionMethod.CIRCUMFERENCE:
        return this.circumference(length, width, height);
      default:
        return length + width + height; // Safe default
    }
  }
}
```

---

## Implementation Examples

### Basic Package Validation

```typescript
import { DimensionValidator } from './validation/dimension-validator';
import { evriServices, upsServices } from './config/service-configs';

const validator = new DimensionValidator([...evriServices, ...upsServices]);

const package = {
  length: 250,    // 25cm
  width: 150,     // 15cm  
  height: 30,     // 3cm
  weight: 800,    // 800g
  dimension_unit: 'mm',
  weight_unit: 'g'
};

const validServices = validator.getValidServices(package);
console.log('Valid services:', validServices);
// Output: [
//   { service_id: 'evri_48_packets', validation_passed: true },
//   { service_id: 'evri_48_parcels', validation_passed: true }
// ]
```

### Cost Optimization Integration

```typescript
const validServices = validator.getValidServices(package);
const optimalService = costOptimizer.selectCheapest(validServices);

console.log(`Optimal service: ${optimalService.service_name} at £${optimalService.cost}`);
```

### Batch Validation

```typescript
const packages = [...]; // Array of packages
const auditResults = packages.map(pkg => {
  const validServices = validator.getValidServices(pkg);
  const optimal = costOptimizer.selectCheapest(validServices);
  const current = pkg.assigned_service;
  
  return {
    package_id: pkg.id,
    current_service: current.name,
    optimal_service: optimal.name,
    potential_savings: current.cost - optimal.cost,
    is_optimal: current.service_id === optimal.service_id
  };
});

const totalSavings = auditResults.reduce((sum, result) => 
  sum + Math.max(0, result.potential_savings), 0
);

console.log(`Total potential savings: £${totalSavings.toFixed(2)}`);
```

---

## Carrier-Specific Rules

### EVRI Services

```typescript
const evriServices: ServiceConfig[] = [
  {
    service_id: 'evri_48_packets',
    service_name: 'EVRI 48 Packets',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 999,
      box_dimensions_mm: [350, 230, 30]
    }
  },
  {
    service_id: 'evri_48_parcels',
    service_name: 'EVRI 48 Parcels',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 15000,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'evri_light_large',
    service_name: 'EVRI Light & Large',
    carrier: 'EVRI',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 1800,
      max_girth_mm: 2400,
      max_length_plus_girth_mm: 4200
    }
  }
];
```

### UPS Services

```typescript
const upsServices: ServiceConfig[] = [
  {
    service_id: 'ups_ground_commercial',
    service_name: 'UPS Ground Commercial',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'  // L + 2×(W + H)
    }
  }
];
```

### Amazon Services

```typescript
const amazonServices: ServiceConfig[] = [
  {
    service_id: 'amazon_large_letter',
    service_name: 'Amazon Large Letter',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 750,
      box_dimensions_mm: [353, 250, 25]
    }
  },
  {
    service_id: 'amazon_small_parcel',
    service_name: 'Amazon Small Parcel',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 2000,
      box_dimensions_mm: [450, 350, 160]
    }
  }
];
```

## Carrier Combined Dimension Methods Reference

| Carrier | Method | Formula | Example Limit |
|---------|--------|---------|---------------|
| EVRI | `standard_sum` | L + W + H | 225cm (2250mm) |
| Amazon | `standard_sum` | L + W + H | 245cm (2450mm) |
| Royal Mail | `standard_sum` | L + W + H | 104cm (1040mm) |
| UPS | `length_plus_girth` | L + 2×(W + H) | 400cm (4000mm) |
| FedEx | `length_plus_girth` | L + 2×(W + H) | 330cm (3302mm) |
| USPS | `length_plus_girth` | L + 2×(W + H) | 279cm (2794mm) |
| DHL | Mixed | Varies by service | Varies |
| DPD | `circumference` | Custom formula | 300cm (3000mm) |

---

## Migration from Legacy Rules

### Before (Rule-Based Exclusions)

```javascript
// Old exclusion-based approach
if ({max_side} >= 1200) return false;        // Exclude EVRI 48 Packets
if ({gross_weight} >= 1201) return false;    // Exclude if over weight
if ({max_side_plus_girth} >= 2250) return false; // Complex girth check
```

**Problems**:
- Rules often incorrect (1200mm vs 350mm for packets)
- Hard to maintain and update
- No clear mapping to carrier contracts
- Complex exclusion logic

### After (Configuration-Driven)

```typescript
// New inclusion-based configuration
{
  service_id: 'evri_48_packets',
  validation_type: 'box_fit',
  constraints: {
    weight_max_g: 999,                    // Clear weight limit
    box_dimensions_mm: [350, 230, 30]     // Direct contract mapping
  }
}
```

**Benefits**:
- Direct mapping to carrier contracts
- Easy to update without code changes
- Clear validation logic
- Scalable across multiple carriers

### Migration Process

1. **Export current rules** → CSV format
2. **Analyze rule patterns** → Map to validation types
3. **Convert to ServiceConfig** → Use appropriate validation type
4. **Validate conversion** → Test with sample packages
5. **Deploy gradually** → Parallel validation during transition

---

## Best Practices

### Configuration Management

1. **Always specify calculation method**:
   ```typescript
   constraints: {
     max_combined_dimensions_mm: 2250,
     combined_calculation_method: 'standard_sum'  // ✅ Explicit
   }
   ```

2. **Use consistent units**:
   - Dimensions: millimeters (mm)
   - Weight: grams (g)

3. **Validate configurations**:
   ```typescript
   // Check for required fields
   if (!service.constraints.weight_max_g) {
     throw new Error(`Missing weight_max_g for ${service.service_id}`);
   }
   ```

### Performance Optimization

1. **Sort services by cost** for early termination
2. **Cache validation results** for repeated calculations
3. **Use appropriate data structures** for constraint checking

### Error Handling

```typescript
try {
  const validServices = validator.getValidServices(package);
  if (validServices.length === 0) {
    console.warn('No valid services found for package', package.id);
    // Handle edge case
  }
} catch (error) {
  console.error('Validation error:', error);
  // Fallback to manual review
}
```

### Testing

```typescript
describe('Service Validation', () => {
  test('EVRI 48 Packets validates correctly', () => {
    const package = { length: 300, width: 200, height: 25, weight: 800 };
    const result = validator.validateService(evriPacketsService, package);
    expect(result).toBe(true);
  });
  
  test('Package too large for EVRI 48 Packets', () => {
    const package = { length: 400, width: 300, height: 50, weight: 800 };
    const result = validator.validateService(evriPacketsService, package);
    expect(result).toBe(false);
  });
});
```

---

## Troubleshooting

### Common Issues

1. **Incorrect combined dimension calculation**:
   - ❌ Using wrong formula for carrier
   - ✅ Check `combined_calculation_method` field

2. **Unit conversion errors**:
   - ❌ Mixing cm and mm in calculations
   - ✅ Normalize all dimensions to mm

3. **Box fit validation fails**:
   - ❌ Not sorting dimensions correctly
   - ✅ Sort both package and box dimensions before comparison

4. **Girth calculations wrong**:
   - ❌ Using wrong dimension as "length"
   - ✅ Sort dimensions and use longest as length

### Debugging

```typescript
// Enable detailed logging
const validator = new DimensionValidator(services, { debug: true });

// Check specific service validation
const result = validator.validateServiceDetailed(service, package);
console.log('Validation details:', result.details);
// Output: {
//   weight_check: 'passed',
//   dimension_check: 'failed',
//   reason: 'Combined dimensions 2300mm exceed limit 2250mm'
// }
```

---

## Support

For questions about the shipping validation system:

1. Check this documentation first
2. Review carrier-specific contract documents
3. Test with the validation tool
4. Contact the shipping team for clarification

**Remember**: When in doubt about carrier calculations, always reference the official carrier documentation and test with their validation tools.
