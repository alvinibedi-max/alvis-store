import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type AuthenticityResult = {
  authenticityConfidence: number;
  authenticityNotes: string | 'UNKNOWN';
};

export async function runAuthenticity(order: OrderRequest): Promise<AgentResult<AuthenticityResult>> {
  const result: AuthenticityResult = {
    authenticityConfidence: 0,
    authenticityNotes: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Authenticity research initialized',
      `Starting authenticity assessment for query: ${order.productQuery}`,
      'AuthenticityAgent',
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
    agentName: 'AuthenticityAgent',
    result,
    evidence,
    status,
  };
}
