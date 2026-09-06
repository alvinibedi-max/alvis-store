import {AgentResult, EvidenceRecord, ProductSourcingEvaluation} from './types';
import {buildEvidence} from './utils';

export async function detectConflicts(evaluation: ProductSourcingEvaluation): Promise<AgentResult<{conflicts: string[]; summary: string;}>> {
  const conflicts: string[] = [];

  if (evaluation.identity.result.regionVersion === 'UNKNOWN' && evaluation.identity.result.targetResaleMarket !== 'UNKNOWN') {
    conflicts.push('Product region version is unknown while target resale market is known.');
  }

  if (evaluation.identity.result.lockedStatus === 'UNKNOWN') {
    conflicts.push('Locked/unlocked status is unknown.');
  }

  if (evaluation.price.status.completed === false) {
    conflicts.push('Price research is incomplete.');
  }

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Conflict detection run',
      `Identified ${conflicts.length} potential conflicts in the sourcing evaluation.`,
      'ConflictDetector',
      conflicts.length > 0 ? 'Medium' : 'High',
    ),
  ];

  return {
    agentName: 'ConflictDetector',
    result: {
      conflicts,
      summary: conflicts.length > 0 ? 'Conflicts require investigation.' : 'No immediate conflicts detected.',
    },
    evidence,
    status: {
      completed: true,
      missingFields: [],
      unknownFields: [],
      confidence: conflicts.length > 0 ? 'Medium' : 'High',
    },
  };
}
