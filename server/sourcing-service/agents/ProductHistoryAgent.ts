import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type ProductHistoryResult = {
  rating: number | 'UNKNOWN';
  reviewCount: number | 'UNKNOWN';
  recurringIssues: string | 'UNKNOWN';
  recallNotes: string | 'UNKNOWN';
  ageNotes: string | 'UNKNOWN';
};

export async function runProductHistory(order: OrderRequest): Promise<AgentResult<ProductHistoryResult>> {
  const result: ProductHistoryResult = {
    rating: 'UNKNOWN',
    reviewCount: 'UNKNOWN',
    recurringIssues: 'UNKNOWN',
    recallNotes: 'UNKNOWN',
    ageNotes: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Product history research initialized',
      `Starting product history review for query: ${order.productQuery}`,
      'ProductHistoryAgent',
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
    agentName: 'ProductHistoryAgent',
    result,
    evidence,
    status,
  };
}
