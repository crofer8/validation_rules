
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
    combined_calculation_method?: 'standard_sum' | 'length_plus_girth' | 'circumference' | 'custom';
    max_girth_mm?: number;
    max_length_plus_girth_mm?: number;
  };
}

// =============================================================================
// EVRI Services (12 services) - Standard Sum Calculation
// =============================================================================
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
    service_id: 'evri_24_packets',
    service_name: 'EVRI 24 Packets',
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
    service_id: 'evri_24_parcels',
    service_name: 'EVRI 24 Parcels',
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
    service_id: 'evri_light_large',
    service_name: 'EVRI Light & Large',
    carrier: 'EVRI',
    validation_type: 'oversized',
    constraints: {
      weight_min_g: 15000,
      weight_max_g: 30000,
      max_single_dimension_mm: 1800,
      max_girth_mm: 2400,
      max_length_plus_girth_mm: 4200
    }
  },
  {
    service_id: 'evri_48_packets_international',
    service_name: 'EVRI 48 Packets International',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 999,
      box_dimensions_mm: [350, 230, 30]
    }
  },
  {
    service_id: 'evri_24_packets_international',
    service_name: 'EVRI 24 Packets International',
    carrier: 'EVRI',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 999,
      box_dimensions_mm: [350, 230, 30]
    }
  },
  {
    service_id: 'evri_48_parcels_international',
    service_name: 'EVRI 48 Parcels International',
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
    service_id: 'evri_24_parcels_international',
    service_name: 'EVRI 24 Parcels International',
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
    service_id: 'evri_light_large_international',
    service_name: 'EVRI Light & Large International',
    carrier: 'EVRI',
    validation_type: 'oversized',
    constraints: {
      weight_min_g: 15000,
      weight_max_g: 30000,
      max_single_dimension_mm: 1800,
      max_girth_mm: 2400,
      max_length_plus_girth_mm: 4200
    }
  }
];

// =============================================================================
// Amazon Services (14 services) - Box Fit Categories
// =============================================================================
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
  },
  {
    service_id: 'amazon_standard_parcel',
    service_name: 'Amazon Standard Parcel',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 7000,
      box_dimensions_mm: [500, 400, 300]
    }
  },
  {
    service_id: 'amazon_medium_parcel',
    service_name: 'Amazon Medium Parcel',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 15000,
      box_dimensions_mm: [610, 460, 460]
    }
  },
  {
    service_id: 'amazon_large_parcel',
    service_name: 'Amazon Large Parcel',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 20000,
      box_dimensions_mm: [670, 510, 510]
    }
  },
  {
    service_id: 'amazon_extra_large_parcel',
    service_name: 'Amazon Extra Large Parcel',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 23000,
      box_dimensions_mm: [1200, 600, 600]
    }
  },
  {
    service_id: 'amazon_shipping_48',
    service_name: 'Amazon Shipping 48',
    carrier: 'AMAZON',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'amazon_shipping_24',
    service_name: 'Amazon Shipping 24',
    carrier: 'AMAZON',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
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
    service_id: 'amazon_shipping_24_small',
    service_name: 'Amazon Shipping 24 Small',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [450, 350, 160]
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
    service_id: 'amazon_shipping_24_medium',
    service_name: 'Amazon Shipping 24 Medium',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [610, 460, 460]
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
    service_id: 'amazon_shipping_24_standard',
    service_name: 'Amazon Shipping 24 Standard',
    carrier: 'AMAZON',
    validation_type: 'box_fit',
    constraints: {
      box_dimensions_mm: [500, 400, 300]
    }
  }
];

// =============================================================================
// UPS Services (10 services) - Length + Girth Calculation
// =============================================================================
const upsServices: ServiceConfig[] = [
  {
    service_id: 'ups_express_saver',
    service_name: 'UPS Express Saver',
    carrier: 'UPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 30000,
      max_single_dimension_mm: 2700,
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 4000,
      combined_calculation_method: 'length_plus_girth'
    }
  },
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
      max_combined_dimensions_mm: 2794,
      combined_calculation_method: 'length_plus_girth'
    }
  }
];

// =============================================================================
// FedEx Services (9 services) - Length + Girth Calculation
// =============================================================================
const fedexServices: ServiceConfig[] = [
  {
    service_id: 'fedex_international_connect_ddu',
    service_name: 'FedEx International Connect DDU',
    carrier: 'FEDEX',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 29937,
      max_single_dimension_mm: 1499,
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
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
      max_combined_dimensions_mm: 3302,
      combined_calculation_method: 'length_plus_girth'
    }
  }
];

// =============================================================================
// Royal Mail Services (6 services) - Standard Sum Calculation
// =============================================================================
const royalMailServices: ServiceConfig[] = [
  {
    service_id: 'royal_mail_large_letter',
    service_name: 'Royal Mail Large Letter',
    carrier: 'ROYAL',
    validation_type: 'box_fit',
    constraints: {
      weight_max_g: 750,
      box_dimensions_mm: [353, 250, 25]
    }
  },
  {
    service_id: 'royal_mail_small_parcel',
    service_name: 'Royal Mail Small Parcel',
    carrier: 'ROYAL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 450,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'royal_mail_medium_parcel',
    service_name: 'Royal Mail Medium Parcel',
    carrier: 'ROYAL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 20000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'royal_mail_48_tracked',
    service_name: 'Royal Mail 48 Tracked',
    carrier: 'ROYAL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'royal_mail_24_tracked',
    service_name: 'Royal Mail 24 Tracked',
    carrier: 'ROYAL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'royal_mail_special_delivery',
    service_name: 'Royal Mail Special Delivery',
    carrier: 'ROYAL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 610,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
    }
  }
];

// =============================================================================
// DHL Services (17 services) - Mixed Calculation Methods
// =============================================================================
const dhlServices: ServiceConfig[] = [
  {
    service_id: 'dhl_service_point',
    service_name: 'DHL Service Point',
    carrier: 'DHL',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 20000,
      box_dimensions_min_mm: [20, 110, 150],
      max_combined_dimensions_mm: 3000,
      combined_calculation_method: 'circumference'
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
      max_combined_dimensions_mm: 3000,
      combined_calculation_method: 'standard_sum'
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
      max_combined_dimensions_mm: 3000,
      combined_calculation_method: 'standard_sum'
    }
  },
  {
    service_id: 'dhl_global_mail',
    service_name: 'DHL Global Mail',
    carrier: 'DHL',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 2000,
      max_single_dimension_mm: 600,
      max_combined_dimensions_mm: 900,
      combined_calculation_method: 'standard_sum'
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

// =============================================================================
// USPS Services (9 services) - Length + Girth Calculation
// =============================================================================
const uspsServices: ServiceConfig[] = [
  {
    service_id: 'usps_ground_advantage',
    service_name: 'USPS Ground Advantage',
    carrier: 'USPS',
    validation_type: 'oversized',
    constraints: {
      weight_max_g: 31751,
      max_single_dimension_mm: 1092,
      max_combined_dimensions_mm: 2794,
      combined_calculation_method: 'length_plus_girth'
    }
  },
  {
    service_id: 'usps_first_class_package',
    service_name: 'USPS First Class Package',
    carrier: 'USPS',
    validation_type: 'dimension_limits',
    constraints: {
      weight_max_g: 453,
      max_single_dimension_mm: 559
    }
  },
  {
    service_id: 'usps_priority_mail_standard',
    service_name: 'USPS Priority Mail Standard',
    carrier: 'USPS',
