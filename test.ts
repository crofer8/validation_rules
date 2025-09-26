/**
 * Enhanced Internal Package Validation Rules - Industry Standard Approach
 * 
 * Updated from: converted_service_configs.ts
 * Conversion Date: 2025-08-19
 * 
 * Based on research into ShipEngine, Shippo, and other major shipping platforms,
 * this approach follows industry standards without over-engineering
 */

interface ServiceConstraint {
  weight_max_g?: number;
  weight_min_g?: number;
  box_dimensions_mm?: number[];
  box_dimensions_min_mm?: number[];
  max_single_dimension_mm?: number;
  min_single_dimension_mm?: number;
  max_combined_dimensions_mm?: number;
  min_combined_dimensions_mm?: number;
  max_girth_mm?: number;
  max_length_plus_girth_mm?: number;
  combined_calculation_method?: 'standard_sum' | 'length_plus_girth' | 'circumference' | 'custom';
}

interface ServiceConfig {
  service_id: string;
  service_name: string;
  carrier: string;
  validation_type: 'box_fit' | 'dimension_limits' | 'oversized';
  constraints: ServiceConstraint;
  rule_description?: string;
}

// EVRI Services with multiple rules per service (OR condition between same service_id)
const evriServices: ServiceConfig[] = [
  // EVRI Light & Large - Rule 1: Heavy packages (15-30kg) with standard dimensions
  {
    service_id: 'evri_light_large',
    service_name: 'EVRI Light & Large',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_min_g: 15000,
      weight_max_g: 30000,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250,
      combined_calculation_method: 'standard_sum'
    },
    rule_description: "Heavy packages (15-30kg) within standard dimension limits"
  },
  
  // EVRI Light & Large - Rule 2: Oversized packages (any weight up to 30kg)
  {
    service_id: 'evri_light_large',
    service_name: 'EVRI Light & Large',
    carrier: 'EVRI',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      min_single_dimension_mm: 1200,     // Must exceed 120cm single dimension
      max_single_dimension_mm: 1800,     // But not exceed 180cm
      min_combined_dimensions_mm: 2250,  // Must exceed 225cm combined dimensions
      max_girth_mm: 2400,                // Max girth 240cm
      max_length_plus_girth_mm: 4200     // Max length + girth 420cm
    },
    rule_description: "Oversized packages exceeding standard limits (>120cm single OR >225cm combined)"
  },

  // EVRI Large Letters
  {
    service_id: 'evri_large_letter_48',
    service_name: 'EVRI Large Letter 48',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_min_g: 250,
      weight_max_g: 1000,
      box_dimensions_mm: [350, 230, 30]
    }
  },
  {
    service_id: 'evri_large_letter_24',
    service_name: 'EVRI Large Letter 24',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_min_g: 250,
      weight_max_g: 1000,
      box_dimensions_mm: [350, 230, 30]
    }
  },

  // EVRI Packets
  {
    service_id: 'evri_24_packets',
    service_name: 'EVRI 24 Packets',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_min_g: 250,
      weight_max_g: 1000,
      box_dimensions_mm: [350, 230, 30]
    }
  },
  {
    service_id: 'evri_48_packets',
    service_name: 'EVRI 48 Packets',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_min_g: 250,
      weight_max_g: 1000,
      box_dimensions_mm: [350, 230, 30]
    }
  },

  // EVRI Parcels
  {
    service_id: 'evri_24_parcels',
    service_name: 'EVRI 24 Parcels',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 15000,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2450,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 2450,
      combined_calculation_method: 'length_plus_girth'
    }
  }
];

// Example validation logic - OR condition between rules with same service_id
function getValidServices(package: Package, services: ServiceConfig[]): string[] {
  const validServiceIds = new Set<string>();
  
  // Group services by service_id
  const serviceGroups = services.reduce((groups, service) => {
    if (!groups[service.service_id]) {
      groups[service.service_id] = [];
    }
    groups[service.service_id].push(service);
    return groups;
  }, {} as Record<string, ServiceConfig[]>);
  
  // Check each service group - if ANY rule passes, service is valid (OR condition)
  Object.entries(serviceGroups).forEach(([serviceId, rules]) => {
    const isValidService = rules.some(rule => 
      validateConstraints(package, rule.constraints, rule.validation_type)
    );
    
    if (isValidService) {
      validServiceIds.add(serviceId);
    }
  });
  
  return Array.from(validServiceIds);
}

// Example usage
const package = {
  length: 1300,    // 130cm - exceeds standard limit
  width: 200,      // 20cm
  height: 100,     // 10cm
  weight: 5000,    // 5kg - light package
  dimension_unit: 'mm',
  weight_unit: 'g'
};

const validServices = getValidServices(package, evriServices);
console.log('Valid services:', validServices);
// Output: ['evri_light_large'] - because it matches Rule 2 (oversized dimensions)
// Amazon Services (Updated to new structure)
const amazonServices: ServiceConfig[] = [
  {
    service_id: 'amazon_shipping_48_extra_large',
    service_name: 'Amazon Shipping 48 Extra Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [1200, 600, 600]
    }
  },
  {
    service_id: 'amazon_shipping_24_large',
    service_name: 'Amazon Shipping 24 Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [670, 510, 510]
    }
  },
  {
    service_id: 'amazon_shipping_48_large_letter',
    service_name: 'Amazon Shipping 48 Large Letter',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [353, 250, 25]
    }
  },
  {
    service_id: 'amazon_shipping_48_large',
    service_name: 'Amazon Shipping 48 Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [670, 510, 510],
      max_combined_dimensions_mm: 2450
    }
  },
  {
    service_id: 'amazon_shipping_24_large_letter',
    service_name: 'Amazon Shipping 24 Large Letter',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [353, 250, 25]
    }
  },
  {
    service_id: 'amazon_shipping_24_extra_large',
    service_name: 'Amazon Shipping 24 Extra Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [1200, 600, 600],
      max_combined_dimensions_mm: 2450
    }
  },
  {
    service_id: 'amazon_shipping_24_standard',
    service_name: 'Amazon Shipping 24 Standard',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [500, 400, 300]
    }
  },
  {
    service_id: 'amazon_shipping_48_medium',
    service_name: 'Amazon Shipping 48 Medium',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [610, 460, 460]
    }
  },
  {
    service_id: 'amazon_shipping_24_small',
    service_name: 'Amazon Shipping 24 Small',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [450, 350, 160]
    }
  },
  {
    service_id: 'amazon_shipping_48_small',
    service_name: 'Amazon Shipping 48 Small',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [450, 350, 160]
    }
  },
  {
    service_id: 'amazon_shipping_48_standard',
    service_name: 'Amazon Shipping 48 Standard',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [500, 400, 300]
    }
  },
  {
    service_id: 'amazon_shipping_24_medium',
    service_name: 'Amazon Shipping 24 Medium',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [610, 460, 460]
    }
  }
];

// Royal Mail Services
const royalMailServices: ServiceConfig[] = [
  {
    service_id: 'royal_mail_48_tracked_trs',
    service_name: 'Royal Mail 48 Tracked',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 750,
      max_single_dimension_mm: 350,
      max_combined_dimensions_mm: 1040
    }
  },
  {
    service_id: 'royal_mail_24_tracked',
    service_name: 'Royal Mail 24 Tracked',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      max_single_dimension_mm: 900,
      max_combined_dimensions_mm: 1040
    }
  },
  {
    service_id: 'royal_mail_24_tracked_trn',
    service_name: 'Royal Mail 24 Tracked',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 750,
      max_single_dimension_mm: 700,
      max_combined_dimensions_mm: 1040
    }
  },
  {
    service_id: 'royal_mail_48_tracked',
    service_name: 'Royal Mail 48 Tracked',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      max_single_dimension_mm: 900,
      max_combined_dimensions_mm: 1040
    }
  },
  {
    service_id: 'royal_mail_international_tracked',
    service_name: 'Royal Mail International Tracked',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      max_single_dimension_mm: 900,
      max_combined_dimensions_mm: 1040
    }
  },
  {
    service_id: 'royal_mail_special_delivery',
    service_name: 'Royal Mail Special Delivery',
    carrier: 'ROYAL',
    validation_type: 'oversized',
    constraints: {
      max_single_dimension_mm: 900,
      max_combined_dimensions_mm: 1040
    }
  }
];

// UPS Services
const upsServices: ServiceConfig[] = [
  {
    service_id: 'ups_us_heavyweight_mi_domestic',
    service_name: 'UPS US Heavyweight MI Domestic',
    carrier: 'UPS',
    validation_type: 'dimension_limits',
    constraints: {
      weight_min_g: 454,
      max_single_dimension_mm: 559
    }
  },
  {
    service_id: 'ups_express_saver',
    service_name: 'UPS Express Saver',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_us_mi_bpm',
    service_name: 'UPS US MI BPM',
    carrier: 'UPS',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 6803,
      max_single_dimension_mm: 381
    }
  },
  {
    service_id: 'ups_standard_tariff',
    service_name: 'UPS Standard Tariff',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_2_day',
    service_name: 'UPS 2 Day',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_ground_commercial',
    service_name: 'UPS Ground Commercial',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_ground_residential',
    service_name: 'UPS Ground Residential',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_surepost',
    service_name: 'UPS Surepost',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000
    }
  },
  {
    service_id: 'ups_us_lightweight_mi_domestic',
    service_name: 'UPS US Lightweight MI Domestic',
    carrier: 'UPS',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 559
    }
  },
  {
    service_id: 'ups_us_mi_international',
    service_name: 'UPS US MI International',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 559,
      max_combined_dimensions_mm: 2794
    }
  }
];

// DHL Services  
const dhlServices: ServiceConfig[] = [
  {
    service_id: 'dhl_service_point',
    service_name: 'DHL Service Point',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 20000,
      box_dimensions_min_mm: [20, 110, 150],
      max_combined_dimensions_mm: 3000
    }
  },
  {
    service_id: 'dhl_global_parcel',
    service_name: 'DHL Global Parcel',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      // Weight limits
      weight_max_g: 31500, // 31.5 kg
      
      // Minimum dimensions
      box_dimensions_min_mm: [15, 11, 1], // Length 15cm, Width 11cm, Height 1cm
      
      // Maximum dimensions  
      max_single_dimension_mm: 1200, // Length max 120cm
      
      // Maximum girth (2 * (W + H))
      max_girth_mm: 3000 // Max girth 300cm
    },
    alternative_constraints: [
      {
        // Alternative for roll-shaped items
        weight_max_g: 31500,
        box_dimensions_min_mm: [15, 11, 1],
        max_single_dimension_mm: 1200, // Max length still 120cm
        max_girth_mm: 1500 // Roll-shaped items: max 15cm diameter (circumference ~47cm, but using 150cm for safety)
      }
    ],
    rule_description: "Min: 15x11x1cm. Max: 120x60x60cm, 300cm girth, 31.5kg. Roll-shaped items: max 15cm diameter. Inadequate packaging may incur surcharge."
  },
  {
    service_id: 'dhl_warenpost',
    service_name: 'DHL Warenpost',
    carrier: 'DHL',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 1000,
      box_dimensions_mm: [353, 250, 80]
    }
  },
  {
    service_id: 'dhl_se_service_point',
    service_name: 'DHL SE Service Point',
    carrier: 'DHL',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [600, 600, 1200]
    }
  },
  {
    service_id: 'dhl_se_paket',
    service_name: 'DHL SE Paket',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200,
      weight_max_g: 31500
    }
  },
  {
    service_id: 'dhl_parcel_connect_home',
    service_name: 'DHL Parcel Connect Home',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 31500,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 3000
    }
  },
  {
    service_id: 'dhl_economy_select',
    service_name: 'DHL Economy Select',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200
    }
  },
  {
    service_id: 'dhl_express_worldwide',
    service_name: 'DHL Express Worldwide',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200,
      weight_max_g: 70000
    }
  },
  {
    service_id: 'dhl_express_domestic_12_00',
    service_name: 'DHL Express Domestic 12:00',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200
    }
  },
  {
    service_id: 'dhl_express_worldwide_ddu',
    service_name: 'DHL Express Worldwide DDU',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 70000,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 3000
    }
  },
  {
    service_id: 'dhl_global_mail',
    service_name: 'DHL Global Mail',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 600,
      max_combined_dimensions_mm: 900
    }
  },
  {
    service_id: 'dhl_express_worldwide_12_00',
    service_name: 'DHL Express Worldwide 12:00',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200
    }
  },
  {
    service_id: 'dhl_se_euroconnect_plus',
    service_name: 'DHL SE Euroconnect Plus',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200,
      weight_max_g: 31500
    }
  },
  {
    service_id: 'dhl_express_domestic',
    service_name: 'DHL Express Domestic',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200,
      weight_max_g: 70000
    }
  },
  {
    service_id: 'dhl_parcel_connect',
    service_name: 'DHL Parcel Connect',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200,
      weight_max_g: 31500
    }
  },
  {
    service_id: 'dhl_parcel',
    service_name: 'DHL Parcel',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200
    }
  },
  {
    service_id: 'dhl_warenpost_international',
    service_name: 'DHL Warenpost International',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 600,
      weight_max_g: 2000
    }
  }
];

// FedEx Services
const fedexServices: ServiceConfig[] = [
  {
    service_id: 'fedex_international_connect_ddu',
    service_name: 'FedEx International Connect DDU',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_priority_overnight',
    service_name: 'FedEx Priority Overnight',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 31752,
      max_single_dimension_mm: 1524,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_international_connect_plus_gb_ddp',
    service_name: 'FedEx International Connect Plus GB DDP',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_international_connect_plus_gb_ddu',
    service_name: 'FedEx International Connect Plus GB DDU',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_international_connect_ddp',
    service_name: 'FedEx International Connect DDP',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_international_connect_plus',
    service_name: 'FedEx International Connect Plus',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  },
  {
    service_id: 'fedex_international_connect_gb_ddu',
    service_name: 'FedEx International Connect GB DDU',
    carrier: 'FEDEX',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1499,
      weight_max_g: 29937
    }
  },
  {
    service_id: 'fedex_international_connect_gb_ddp',
    service_name: 'FedEx International Connect GB DDP',
    carrier: 'FEDEX',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1499,
      weight_max_g: 29937
    }
  },
  {
    service_id: 'fedex_international_connect_plus_ddu',
    service_name: 'FedEx International Connect Plus DDU',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302
    }
  }
];

// Simple validator class - industry standard approach
class PackageValidator {
  
  validatePackage(packageData: PackageData, service: ServiceConfig): boolean {
    // Check primary constraints
    if (!this.validateConstraint(packageData, service.constraints)) {
      // If primary fails, check alternatives (OR conditions)
      if (service.alternative_constraints) {
        return service.alternative_constraints.some(constraint => 
          this.validateConstraint(packageData, constraint)
        );
      }
      return false;
    }
    return true;
  }
  
  private validateConstraint(packageData: PackageData, constraint: ServiceConstraint): boolean {
    // Weight validation
    if (constraint.weight_min_g && packageData.weight_g < constraint.weight_min_g) {
      return false;
    }
    if (constraint.weight_max_g && packageData.weight_g > constraint.weight_max_g) {
      return false;
    }
    
    // Dimension validation
    const maxDim = Math.max(packageData.length_mm, packageData.width_mm, packageData.height_mm);
    if (constraint.max_single_dimension_mm && maxDim > constraint.max_single_dimension_mm) {
      return false;
    }
    
    // Combined dimensions (L + 2W + 2H)
    const combinedDim = packageData.length_mm + (2 * packageData.width_mm) + (2 * packageData.height_mm);
    if (constraint.max_combined_dimensions_mm && combinedDim > constraint.max_combined_dimensions_mm) {
      return false;
    }
    
    // Girth validation (2 * (W + H))
    const girth = 2 * (packageData.width_mm + packageData.height_mm);
    if (constraint.max_girth_mm && girth > constraint.max_girth_mm) {
      return false;
    }
    
    // Length + Girth
    const lengthPlusGirth = packageData.length_mm + girth;
    if (constraint.max_length_plus_girth_mm && lengthPlusGirth > constraint.max_length_plus_girth_mm) {
      return false;
    }
    
    // Box fit validation
    if (constraint.box_dimensions_mm) {
      const [maxL, maxW, maxH] = constraint.box_dimensions_mm.sort((a, b) => b - a);
      const packageDims = [packageData.length_mm, packageData.width_mm, packageData.height_mm].sort((a, b) => b - a);
      
      if (packageDims[0] > maxL || packageDims[1] > maxW || packageDims[2] > maxH) {
        return false;
      }
    }
    
    return true;
  }
  
  // Get all valid services for a package
  getValidServices(packageData: PackageData, services: ServiceConfig[]): ServiceConfig[] {
    return services.filter(service => this.validatePackage(packageData, service));
  }
}

interface PackageData {
  weight_g: number;
  length_mm: number;
  width_mm: number;
  height_mm: number;
}

// Combine all services
const allServiceConfigs: ServiceConfig[] = [
  ...evriServices,
  ...amazonServices,
  ...royalMailServices,
  ...upsServices,
  ...dhlServices,
  ...fedexServices
];

// Export configurations
export {
  ServiceConfig,
  ServiceConstraint,
  PackageValidator,
  PackageData,
  evriServices,
  amazonServices,
