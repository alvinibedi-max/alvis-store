import {AgentResult, EvidenceRecord, CostBreakdown, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence, mergeUnknownableNumber} from '../utils';

export async function runProfitCalculation(order: OrderRequest, cost: CostBreakdown): Promise<AgentResult<{expectedNetProfit: number | 'UNKNOWN'; profitStatus: 'TARGET' | 'ACCEPTABLE' | 'REJECT' | 'NEEDS VERIFICATION'}>> {
  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Profit calculation initialized',
      `Starting profit calculation for query: ${order.productQuery}`,
      'ProfitCalculatorAgent',
      'Medium',
    ),
  ];

  const requiredCostFields: Array<keyof CostBreakdown> = [
    'purchasePrice',
    'shipping',
    'taxes',
    'duties',
    'agentFees',
    'paymentFees',
    'currencyConversion',
    'requiredAccessoriesCost',
    'sellingFees',
    'customerShipping',
    'expectedReturnCost',
    'otherCosts',
    'totalLandedCost',
  ];

  const hasUnknownCost = requiredCostFields.some(field => cost[field] === 'UNKNOWN');
  const expectedNetProfit = hasUnknownCost ? 'UNKNOWN' : (cost.purchasePrice as number) - (cost.totalLandedCost as number);

  const profitStatus = hasUnknownCost
    ? 'NEEDS VERIFICATION'
    : expectedNetProfit >= 145
    ? 'TARGET'
    : expectedNetProfit >= 45
    ? 'ACCEPTABLE'
    : 'REJECT';

  const status: VerificationStatus = {
    completed: !hasUnknownCost,
    missingFields: hasUnknownCost ? requiredCostFields.filter(field => cost[field] === 'UNKNOWN') : [],
    unknownFields: hasUnknownCost ? requiredCostFields.filter(field => cost[field] === 'UNKNOWN') : [],
    confidence: hasUnknownCost ? 'Low' : 'High',
  };

  return {
    agentName: 'ProfitCalculatorAgent',
    result: {
      expectedNetProfit,
      profitStatus,
    },
    evidence,
    status,
  };
}
