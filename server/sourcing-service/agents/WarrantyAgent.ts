import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type WarrantyResult = {
  warrantyValidInTargetMarket: boolean | 'UNKNOWN';
  coverageSummary: string | 'UNKNOWN';
  transferable: boolean | 'UNKNOWN';
};

export async function runWarranty(order: OrderRequest): Promise<AgentResult<WarrantyResult>> {
  const result: WarrantyResult = {
    warrantyValidInTargetMarket: 'UNKNOWN',
    coverageSummary: 'UNKNOWN',
    transferable: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Warranty research initialized',
      `Starting warranty assessment for query: ${order.productQuery}`,
      'WarrantyAgent',
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
    agentName: 'WarrantyAgent',
    result,
    evidence,
    status,
  };
}
