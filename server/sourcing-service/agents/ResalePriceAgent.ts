import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type ResalePriceResult = {
  estimatedSellingPrice: Unknownable<number>;
  priceRange: Unknownable<string>;
  marketDemand: Unknownable<'High' | 'Medium' | 'Low' | 'Unknown'>;
  competitorCount: Unknownable<number>;
  priceConfidence: number;
  regionAdjustment: Unknownable<number>;
  estimatedSellDays: Unknownable<number>;
};

export async function runResalePrice(order: OrderRequest): Promise<AgentResult<ResalePriceResult>> {
  const result: ResalePriceResult = {
    estimatedSellingPrice: 'UNKNOWN',
    priceRange: 'UNKNOWN',
    marketDemand: 'UNKNOWN',
    competitorCount: 'UNKNOWN',
    priceConfidence: 0,
    regionAdjustment: 'UNKNOWN',
    estimatedSellDays: 'UNKNOWN',
  };

  const evidence = [
    buildEvidence(
      'Resale price estimation started',
      `Analyzing realistic selling price for: ${order.productQuery} in ${order.customerCountry}`,
      'ResalePriceAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['estimatedSellingPrice', 'priceRange', 'marketDemand'],
    unknownFields: ['estimatedSellingPrice', 'priceRange', 'competitorCount'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'ResalePriceAgent',
    result,
    evidence,
    status,
  };
}
