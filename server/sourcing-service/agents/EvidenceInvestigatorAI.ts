import {AgentResult, ProductSourcingEvaluation, VerificationStatus} from '../types';
import {buildEvidence, nowTimestamp} from '../utils';

export type ConflictInvestigationResult = {
  conflictResolved: boolean;
  resolutionMethod: string;
  winningEvidence: string;
  confidenceAfterResolution: number;
};

export async function runEvidenceInvestigator(
  conflicts: Array<{field: string; ai1: string; ai1Result: unknown; ai2: string; ai2Result: unknown}>,
): Promise<AgentResult<ConflictInvestigationResult>> {
  const result: ConflictInvestigationResult = {
    conflictResolved: false,
    resolutionMethod: 'UNKNOWN',
    winningEvidence: 'UNKNOWN',
    confidenceAfterResolution: 0,
  };

  const evidence = [
    buildEvidence(
      'Evidence investigation started',
      `Investigating ${conflicts.length} conflict(s) between AI conclusions. Finding original sources and evaluating evidence strength.`,
      'EvidenceInvestigatorAI',
      'High',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['resolutionMethod', 'winningEvidence'],
    unknownFields: ['resolutionMethod', 'winningEvidence'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'EvidenceInvestigatorAI',
    result,
    evidence,
    status,
  };
}
