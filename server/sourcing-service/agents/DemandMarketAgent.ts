import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type DemandMarketResult = {
  demandLevel: Unknownable<'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low'>;
  competitorListings: Unknownable<number>;
  marketSaturation: Unknownable<string>;
  searchInterest: Unknownable<number>;
  salesVelocity: Unknownable<string>;
  seasonalTrend: Unknownable<string>;
  demandScore: number;
};

export async function runDemandMarket(order: OrderRequest): Promise<AgentResult<DemandMarketResult>> {
  const result: DemandMarketResult = {
    demandLevel: 'UNKNOWN',
    competitorListings: 'UNKNOWN',
    marketSaturation: 'UNKNOWN',
    searchInterest: 'UNKNOWN',
    salesVelocity: 'UNKNOWN',
    seasonalTrend: 'UNKNOWN',
    demandScore: 0,
  };

  const evidence = [
    buildEvidence(
      'Market demand analysis started',
      `Checking demand level for: ${order.productQuery}. High demand = faster resale`,
      'DemandMarketAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['demandLevel', 'competitorListings', 'salesVelocity'],
    unknownFields: ['demandLevel', 'marketSaturation', 'searchInterest'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'DemandMarketAgent',
    result,
    evidence,
    status,
  };
}
