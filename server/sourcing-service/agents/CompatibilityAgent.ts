import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type CompatibilityResult = {
  compatible: boolean | 'UNKNOWN';
  issues: string | 'UNKNOWN';
  notes: string | 'UNKNOWN';
};

export async function runCompatibility(order: OrderRequest): Promise<AgentResult<CompatibilityResult>> {
  const result: CompatibilityResult = {
    compatible: 'UNKNOWN',
    issues: 'UNKNOWN',
    notes: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Compatibility research initialized',
      `Starting compatibility assessment for query: ${order.productQuery}`,
      'CompatibilityAgent',
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
    agentName: 'CompatibilityAgent',
    result,
    evidence,
    status,
  };
}
