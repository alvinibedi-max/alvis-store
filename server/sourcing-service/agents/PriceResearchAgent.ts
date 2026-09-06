import {AgentResult, CostBreakdown, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export async function runPriceResearch(order: OrderRequest): Promise<AgentResult<CostBreakdown>> {
  const result: CostBreakdown = {
    purchasePrice: 'UNKNOWN',
    shipping: 'UNKNOWN',
    taxes: 'UNKNOWN',
    duties: 'UNKNOWN',
    agentFees: 'UNKNOWN',
    paymentFees: 'UNKNOWN',
    currencyConversion: 'UNKNOWN',
    requiredAccessoriesCost: 'UNKNOWN',
    sellingFees: 'UNKNOWN',
    customerShipping: 'UNKNOWN',
    expectedReturnCost: 'UNKNOWN',
    otherCosts: 'UNKNOWN',
    totalLandedCost: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Price research initialized',
      `Starting true landed cost evaluation for query: ${order.productQuery}`,
      'PriceResearchAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: Object.keys(result),
    unknownFields: Object.keys(result),
    confidence: 'Unknown',
  };

  return {
    agentName: 'PriceResearchAgent',
    result,
    evidence,
    status,
  };
}
