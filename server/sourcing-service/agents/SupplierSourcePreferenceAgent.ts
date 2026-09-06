import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';
import {
  getSourcingPreferencesByBrand,
  FINAL_BUYING_SCORE_WEIGHTS,
  SupplierPreference,
} from '../SourcingPreferencesData';

export type SupplierSourceResult = {
  brandIdentified: Unknownable<string>;
  preferredSupplier: Unknownable<string>;
  preferredCountry: Unknownable<string>;
  baseWeight: Unknownable<number>;
  alternativeSuppliers: Unknownable<Array<{supplier: string; weight: number}>>;
  buyingScoreFormula: string;
  sourcePreferenceConfidence: number;
};

export async function runSupplierSourcePreference(order: OrderRequest): Promise<AgentResult<SupplierSourceResult>> {
  const result: SupplierSourceResult = {
    brandIdentified: 'UNKNOWN',
    preferredSupplier: 'UNKNOWN',
    preferredCountry: 'UNKNOWN',
    baseWeight: 'UNKNOWN',
    alternativeSuppliers: 'UNKNOWN',
    buyingScoreFormula: `
      Final Score = 
        (30% landed price) +
        (20% authenticity & reliability) +
        (15% US compatibility) +
        (10% warranty) +
        (10% return policy) +
        (5% shipping speed) +
        (5% stock availability) +
        (5% resale demand)
    `,
    sourcePreferenceConfidence: 0,
  };

  const evidence = [
    buildEvidence(
      'Supplier source preference analysis started',
      `Analyzing product query: "${order.productQuery}". Determining optimal suppliers based on brand and strategic rankings.`,
      'SupplierSourcePreferenceAgent',
      'High',
    ),
  ];

  // Try to extract brand from product query
  const commonBrands = [
    'Apple',
    'Samsung',
    'Google',
    'Xiaomi',
    'OnePlus',
    'Huawei',
    'Oppo',
    'Honor',
    'Sony',
    'Vivo',
    'Motorola',
    'Nothing',
    'Realme',
    'ASUS',
    'ZTE',
  ];

  let identifiedBrand: string | undefined;
  for (const brand of commonBrands) {
    if (order.productQuery.toLowerCase().includes(brand.toLowerCase())) {
      identifiedBrand = brand;
      break;
    }
  }

  if (identifiedBrand) {
    result.brandIdentified = identifiedBrand;

    // Get sourcing preferences for this brand
    const preferences = getSourcingPreferencesByBrand(identifiedBrand);

    if (preferences) {
      // Set preferred (top-ranked) supplier
      const topSupplier = preferences.suppliers[0];
      result.preferredSupplier = topSupplier.website;
      result.preferredCountry = topSupplier.country;
      result.baseWeight = topSupplier.baseWeight;

      // Set alternatives
      const alternatives = preferences.suppliers.slice(1).map(s => ({
        supplier: `${s.website} (${s.country})`,
        weight: s.baseWeight,
      }));
      result.alternativeSuppliers = alternatives;

      evidence.push(
        buildEvidence(
          'Brand sourcing preferences identified',
          `Brand: ${identifiedBrand}. Top 5 suppliers ranked with base weights. Top choice: ${topSupplier.website} (${topSupplier.baseWeight}% base weight). But AI will adjust based on actual price, authenticity, warranty, and other factors.`,
          'SupplierSourcePreferenceAgent',
          'High',
        ),
      );

      result.sourcePreferenceConfidence = 90;
    } else {
      evidence.push(
        buildEvidence(
          'Brand identified but no preferences found',
          `Brand "${identifiedBrand}" identified but not in sourcing preferences database. Will use dynamic scoring.`,
          'SupplierSourcePreferenceAgent',
          'Medium',
        ),
      );

      result.sourcePreferenceConfidence = 50;
    }
  } else {
    evidence.push(
      buildEvidence(
        'Unable to identify brand',
        `Could not match product query "${order.productQuery}" to known brands. Supplier preferences cannot be applied. AI will evaluate all available suppliers dynamically.`,
        'SupplierSourcePreferenceAgent',
        'Low',
      ),
    );

    result.sourcePreferenceConfidence = 20;
  }

  // Add buying score explanation
  evidence.push(
    buildEvidence(
      'Final buying score calculation weights explained',
      `The AI will calculate final scores as: 30% price + 20% authenticity + 15% US compatibility + 10% warranty + 10% return policy + 5% speed + 5% availability + 5% resale demand. Base supplier weights are STARTING POINTS, not absolute rules. If a lower-ranked supplier has significantly better price/authenticity/warranty, the AI will choose it.`,
      'SupplierSourcePreferenceAgent',
      'High',
    ),
  );

  const status: VerificationStatus = {
    completed: identifiedBrand !== undefined,
    missingFields: identifiedBrand ? [] : ['brandIdentified', 'preferredSupplier'],
    unknownFields: identifiedBrand ? [] : ['preferredSupplier', 'alternativeSuppliers'],
    confidence: result.sourcePreferenceConfidence > 70 ? 'High' : result.sourcePreferenceConfidence > 40 ? 'Medium' : 'Low',
  };

  return {
    agentName: 'SupplierSourcePreferenceAgent',
    result,
    evidence,
    status,
  };
}
