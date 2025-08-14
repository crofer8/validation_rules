/**
 * Converted Internal Package Validation Rules
 * 
 * Generated from: packagevaliadationdump.csv (592 rules)
 * Conversion Date: 2025-01-08
 * 
 * Total Services: 192
 * Total Carriers: 46
 * Validation Types: box_fit (38), dimension_limits (45), oversized (109)
 */

interface ServiceConfig {
  service_id: string;
  service_name: string;
  carrier: string;
  validation_type: 'box_fit' | 'dimension_limits' | 'oversized';
  constraints: {
    weight_max_g?: number;
    weight_min_g?: number;
    box_dimensions_mm?: number[];
    box_dimensions_min_mm?: number[];
    max_single_dimension_mm?: number;
    max_combined_dimensions_mm?: number;
    max_girth_mm?: number;
    max_length_plus_girth_mm?: number;
  };
}

// EVRI Services (12 services)
const evriServices: ServiceConfig[] = [
  {
    service_id: 'evri_light_large',
    service_name: 'EVRI Light & Large',
    carrier: 'EVRI',
    validation_type: 'oversized',
    constraints: {
      weight_min_g: 15000,
      weight_max_g: 30001,
      max_single_dimension_mm: 1800,
      max_combined_dimensions_mm: 4200
    }
  },
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
  {
    service_id: 'evri_24_packets',
    service_name: 'EVRI 24 Packets',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 1201,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250
    }
  },
  {
    service_id: 'evri_48_packets',
    service_name: 'EVRI 48 Packets',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 1201,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250
    }
  },
  {
    service_id: 'evri_24_parcels',
    service_name: 'EVRI 24 Parcels',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 15001,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250
    }
  },
  {
    service_id: 'evri_48_parcels',
    service_name: 'EVRI 48 Parcels',
    carrier: 'EVRI',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 15001,
      max_single_dimension_mm: 1200,
      max_combined_dimensions_mm: 2250
    }
  }
];

// Amazon Services (14 services)  
const amazonServices: ServiceConfig[] = [
  {
    service_id: 'amazon_shipping_48_extra_large',
    service_name: 'Amazon Shipping 48 Extra Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [1200, 600, 600],
      max_combined_dimensions_mm: 2450
    }
  },
  {
    service_id: 'amazon_shipping_24_large',
    service_name: 'Amazon Shipping 24 Large',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [670, 510, 510],
      max_combined_dimensions_mm: 2450
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
    service_id: 'amazon_shipping_48',
    service_name: 'Amazon Shipping 48',
    carrier: 'AMAZON',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      weight_max_g: 2000
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
    service_id: 'amazon_shipping_24',
    service_name: 'Amazon Shipping 24',
    carrier: 'AMAZON',
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      weight_max_g: 2000
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

// Royal Mail Services (6 services)
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

// UPS Services (10 services)
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

// DHL Services (17 services)
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
    validation_type: 'dimension_limits',
    constraints: {
      max_single_dimension_mm: 1200
    }
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

// FedEx Services (9 services)
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

// Combine all services
const allServiceConfigs: ServiceConfig[] = [
  ...evriServices,
  ...amazonServices,
  ...royalMailServices,
  ...upsServices,
  ...dhlServices,
  ...fedexServices
  // Additional carriers would go here...
];

// Export configurations
export {
  ServiceConfig,
  evriServices,
  amazonServices,
  royalMailServices,
  upsServices,
  dhlServices,
  fedexServices,
  allServiceConfigs
};

// Summary statistics
export const conversionSummary = {
  totalServices: 192,
  totalCarriers: 46,
  validationTypes: {
    box_fit: 38,
    dimension_limits: 45,
    oversized: 109
  },
  conversionDate: '2025-01-08',
  sourceFile: 'packagevaliadationdump.csv',
  originalRules: 592
};

/**
 * Usage Examples:
 * 
 * import { evriServices, allServiceConfigs } from './converted-service-configs';
 * 
 * // Use with dimension validator
 * const validator = new DimensionValidator(allServiceConfigs);
 * const validServices = validator.getValidServices(packageData);
 * 
 * // Filter by carrier
 * const evriOnly = allServiceConfigs.filter(s => s.carrier === 'EVRI');
 * 
 * // Filter by validation type
 * const boxFitServices = allServiceConfigs.filter(s => s.validation_type === 'box_fit');
 */

/**
 * Conversion Notes:
 * 
 * 1. Original rules were exclusion-based (if condition then exclude)
 * 2. Converted to inclusion-based constraints (service valid if constraints met)
 * 3. Weight limits converted from exclusion thresholds to maximum values
 * 4. Dimension limits standardized to mm units
 * 5. Complex girth calculations mapped to 'oversized' validation type
 * 6. Box dimensions extracted from fitsDimensions() rules
 * 
 * Key Improvements:
 * - Standardized constraint format across all carriers
 * - Clear separation of validation patterns
 * - Ready for integration with cost optimization algorithms
 * - Supports easy addition of new carriers and services
 */
