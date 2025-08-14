# Package Validation Service Configurations

This repository contains converted package validation rules for various shipping carriers, designed for use in automated package validation workflows.

## 📋 Overview

- **Total Services**: 192
- **Total Carriers**: 46  
- **Validation Types**: 3 (box_fit, dimension_limits, oversized)
- **Generated from**: packagevaliadationdump.csv (592 original rules)
- **Conversion Date**: 2025-01-08

## 🚚 Supported Carriers

| Carrier | Services | Description |
|---------|----------|-------------|
| **EVRI** | 7 services | UK domestic delivery (packets, parcels, large items) |
| **AMAZON** | 14 services | Amazon Shipping (letters, standard, large, extra large) |
| **ROYAL MAIL** | 6 services | UK postal services (tracked, special delivery) |
| **UPS** | 10 services | International express and ground services |
| **DHL** | 17 services | Global express and parcel services |
| **FEDEX** | 9 services | International connect and express services |

## 📦 Validation Types

### 1. **box_fit** (38 services)
Package must fit within specific box dimensions.
```typescript
constraints: {
  box_dimensions_mm: [length, width, height],
  weight_max_g?: number
}
```

### 2. **dimension_limits** (45 services)  
Package must meet maximum dimension and weight constraints.
```typescript
constraints: {
  max_single_dimension_mm: number,
  max_combined_dimensions_mm?: number,
  weight_max_g?: number
}
```

### 3. **oversized** (109 services)
Complex validation for large packages with multiple constraints.
```typescript
constraints: {
  weight_max_g?: number,
  max_single_dimension_mm?: number,
  max_combined_dimensions_mm?: number,
  max_girth_mm?: number
}
```

## 🔧 Usage

### For n8n Workflows

#### Option 1: HTTP Request Node
```javascript
// n8n HTTP Request Node
URL: https://raw.githubusercontent.com/yourusername/yourrepo/main/service-configs.ts
Method: GET
```

#### Option 2: Code Node (Direct Import)
```javascript
// Copy the allServiceConfigs array into your n8n Code Node
const allServiceConfigs = [
  // ... service configurations
];

// Combine with your package data
const result = {
  packages: $input.all(),
  serviceConfigs: allServiceConfigs
};

return [{ json: result }];
```

### For Package Validation Logic

```javascript
// Example: Find valid services for a package
function findValidServices(packageData, carrier) {
  return allServiceConfigs
    .filter(service => service.carrier === carrier)
    .filter(service => validatePackage(packageData, service));
}

// Example: Get smallest valid service
function getSmallestValidService(packageData, carrier) {
  const validServices = findValidServices(packageData, carrier);
  return validServices.sort((a, b) => 
    getServiceSize(a) - getServiceSize(b)
  )[0];
}
```

## 🎯 Business Rules

### Core Validation Rule
> **Always assign the smallest package service that fits the constraints**
> 
> If a package fits in a "packet" service, assign packet (not parcel).  
> If multiple services fit, choose the smallest/cheapest option.

### Example for EVRI:
1. **Large Letter** (350×230×30mm, max 1000g) - smallest
2. **Packets** (max 1200mm single dimension, max 1201g)  
3. **Parcels** (max 1200mm single dimension, max 15001g)
4. **Light & Large** (max 1800mm single dimension, 15-30kg) - largest

## 📊 Service Configuration Structure

```typescript
interface ServiceConfig {
  service_id: string;           // Unique identifier
  service_name: string;         // Human-readable name
  carrier: string;              // Carrier code (EVRI, AMAZON, etc.)
  validation_type: string;      // box_fit | dimension_limits | oversized
  constraints: {
    weight_max_g?: number;                    // Maximum weight in grams
    weight_min_g?: number;                    // Minimum weight in grams
    box_dimensions_mm?: number[];             // [length, width, height] in mm
    box_dimensions_min_mm?: number[];         // Minimum dimensions
    max_single_dimension_mm?: number;         // Largest single dimension
    max_combined_dimensions_mm?: number;      // Length + width + height
    max_girth_mm?: number;                    // 2×(width + height)
    max_length_plus_girth_mm?: number;        // Length + girth
  };
}
```

## 🔍 Quick Examples

### EVRI Large Letter (smallest)
```json
{
  "service_id": "evri_large_letter_48",
  "carrier": "EVRI",
  "validation_type": "box_fit",
  "constraints": {
    "weight_min_g": 250,
    "weight_max_g": 1000,
    "box_dimensions_mm": [350, 230, 30]
  }
}
```

### Amazon Small Package
```json
{
  "service_id": "amazon_shipping_24_small",
  "carrier": "AMAZON", 
  "validation_type": "box_fit",
  "constraints": {
    "box_dimensions_mm": [450, 350, 160]
  }
}
```

## 🛠️ Integration with AI Agents

### Prompt Template for Package Validation
```
Given this package data:
- Package ID: {package_id}
- Dimensions: {length}×{width}×{height}mm
- Weight: {weight}g
- Current carrier: {current_carrier}

And these service configurations: {service_configs}

Rules:
1. Find all valid services for the current carrier
2. Select the SMALLEST service that fits all constraints
3. Prioritize: Large Letter > Packet > Parcel > Large
4. Return the optimal service_id and reasoning

Format response as JSON:
{
  "package_id": "...",
  "recommended_service": "...",
  "current_service": "...", 
  "change_needed": true/false,
  "reasoning": "..."
}
```

## 📝 Notes

- **Original Format**: Exclusion-based rules (if condition then exclude)
- **Converted Format**: Inclusion-based constraints (service valid if constraints met)
- **Units**: All dimensions in millimeters, weights in grams
- **Validation Logic**: Package is valid if ALL constraints are satisfied

## 🔄 Updates

To update the service configurations:
1. Modify the TypeScript arrays
2. Commit changes to repository
3. n8n workflows will automatically use updated rules via HTTP requests

## 📞 Support

For questions about:
- **Service configurations**: Check the conversion notes in the source file
- **Integration**: Refer to the usage examples above
- **Validation logic**: See the business rules section

---

*Generated from packagevaliadationdump.csv on 2025-01-08*
