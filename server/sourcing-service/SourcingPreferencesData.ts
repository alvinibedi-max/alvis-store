// Sourcing Supplier Preferences by Brand
// Each brand has preferred suppliers with base weight percentages
// These are starting points - actual scores adjust based on price, authenticity, warranty, etc.

export type SupplierPreference = {
  rank: number; // 1-5
  website: string;
  country: string;
  baseWeight: number; // 0-100, all weights per brand sum to 100%
};

export type BrandSourcingPreference = {
  brand: string;
  category: string;
  suppliers: SupplierPreference[];
};

export const SOURCING_PREFERENCES: BrandSourcingPreference[] = [
  {
    brand: 'Apple',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Best Buy', country: 'US', baseWeight: 30},
      {rank: 2, website: 'Fortress', country: 'HK', baseWeight: 25},
      {rank: 3, website: 'Yodobashi', country: 'JP', baseWeight: 20},
      {rank: 4, website: 'Bic Camera', country: 'JP', baseWeight: 15},
      {rank: 5, website: 'Amazon US', country: 'US', baseWeight: 10},
    ],
  },
  {
    brand: 'Samsung',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Coupang', country: 'KR', baseWeight: 30},
      {rank: 2, website: 'Fortress', country: 'HK', baseWeight: 25},
      {rank: 3, website: 'Best Buy', country: 'US', baseWeight: 20},
      {rank: 4, website: 'Yodobashi', country: 'JP', baseWeight: 15},
      {rank: 5, website: 'Bic Camera', country: 'JP', baseWeight: 10},
    ],
  },
  {
    brand: 'Google',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Best Buy', country: 'US', baseWeight: 35},
      {rank: 2, website: 'Amazon US', country: 'US', baseWeight: 30},
      {rank: 3, website: 'Fortress', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Yodobashi', country: 'JP', baseWeight: 10},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 10},
    ],
  },
  {
    brand: 'Xiaomi',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 30},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 10},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 5},
    ],
  },
  {
    brand: 'OnePlus',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 30},
      {rank: 3, website: 'Amazon US', country: 'US', baseWeight: 15},
      {rank: 4, website: 'YOHO', country: 'HK', baseWeight: 10},
      {rank: 5, website: 'Best Buy', country: 'US', baseWeight: 5},
    ],
  },
  {
    brand: 'Huawei',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 7},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 3},
    ],
  },
  {
    brand: 'Oppo',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 7},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 3},
    ],
  },
  {
    brand: 'Honor',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 7},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 3},
    ],
  },
  {
    brand: 'Sony',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Yodobashi', country: 'JP', baseWeight: 35},
      {rank: 2, website: 'Bic Camera', country: 'JP', baseWeight: 30},
      {rank: 3, website: 'Amazon Japan', country: 'JP', baseWeight: 20},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 10},
      {rank: 5, website: 'Best Buy', country: 'US', baseWeight: 5},
    ],
  },
  {
    brand: 'Vivo',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 7},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 3},
    ],
  },
  {
    brand: 'Motorola',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Best Buy', country: 'US', baseWeight: 35},
      {rank: 2, website: 'Amazon US', country: 'US', baseWeight: 30},
      {rank: 3, website: 'Fortress', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'YOHO', country: 'HK', baseWeight: 12},
      {rank: 5, website: 'Bic Camera', country: 'JP', baseWeight: 8},
    ],
  },
  {
    brand: 'Nothing',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Amazon US', country: 'US', baseWeight: 35},
      {rank: 2, website: 'YOHO', country: 'HK', baseWeight: 25},
      {rank: 3, website: 'Best Buy', country: 'US', baseWeight: 20},
      {rank: 4, website: 'Fortress', country: 'HK', baseWeight: 12},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 8},
    ],
  },
  {
    brand: 'Realme',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Amazon Japan', country: 'JP', baseWeight: 6},
      {rank: 5, website: 'Amazon US', country: 'US', baseWeight: 4},
    ],
  },
  {
    brand: 'ASUS',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'Yodobashi', country: 'JP', baseWeight: 35},
      {rank: 2, website: 'Bic Camera', country: 'JP', baseWeight: 30},
      {rank: 3, website: 'Amazon Japan', country: 'JP', baseWeight: 20},
      {rank: 4, website: 'Amazon US', country: 'US', baseWeight: 10},
      {rank: 5, website: 'YOHO', country: 'HK', baseWeight: 5},
    ],
  },
  {
    brand: 'ZTE',
    category: 'Phones',
    suppliers: [
      {rank: 1, website: 'JD.com', country: 'CN', baseWeight: 40},
      {rank: 2, website: 'Tmall', country: 'CN', baseWeight: 35},
      {rank: 3, website: 'YOHO', country: 'HK', baseWeight: 15},
      {rank: 4, website: 'Amazon US', country: 'US', baseWeight: 6},
      {rank: 5, website: 'Amazon Japan', country: 'JP', baseWeight: 4},
    ],
  },
];

// Final Buying Score Calculation Weights
export const FINAL_BUYING_SCORE_WEIGHTS = {
  landedPrice: 0.30, // 30% — Most important
  authenticityReliability: 0.20, // 20% — Seller trustworthiness + authenticity confidence
  usCompatibility: 0.15, // 15% — US market compatibility (bands, warranty, etc)
  warranty: 0.10, // 10% — Warranty coverage
  returnPolicy: 0.10, // 10% — Return flexibility
  shippingSpeed: 0.05, // 5% — How fast it arrives
  stockAvailability: 0.05, // 5% — Immediate availability
  resaleDemand: 0.05, // 5% — Expected market demand
};

/**
 * Get sourcing preferences for a specific brand
 * Returns all suppliers ranked by base weight
 */
export function getSourcingPreferencesByBrand(brand: string): BrandSourcingPreference | undefined {
  return SOURCING_PREFERENCES.find(p => p.brand.toLowerCase() === brand.toLowerCase());
}

/**
 * Get supplier base weight for a specific brand + website
 * Returns 0 if not found
 */
export function getSupplierBaseWeight(brand: string, website: string): number {
  const prefs = getSourcingPreferencesByBrand(brand);
  if (!prefs) return 0;

  const supplier = prefs.suppliers.find(s => s.website.toLowerCase() === website.toLowerCase());
  return supplier?.baseWeight || 0;
}
