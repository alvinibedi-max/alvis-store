import {AgentResult, VerificationStatus} from '../types';
import {buildEvidence} from '../utils';

export type IndependentResearchResult = {
  independentVerification: boolean;
  disagreementFound: boolean;
  originalConclusionWrong: boolean;
  correctedInformation: string;
  confidenceInCorrection: number;
};

export async function runIndependentResearcher(
  disputedClaim: string,
  originalSource: string,
): Promise<AgentResult<IndependentResearchResult>> {
  const result: IndependentResearchResult = {
    independentVerification: false,
    disagreementFound: false,
    originalConclusionWrong: false,
    correctedInformation: 'UNKNOWN',
    confidenceInCorrection: 0,
  };

  const evidence = [
    buildEvidence(
      'Independent research verification started',
      `Investigating disputed claim independently, without relying on original AI conclusion. Starting fresh research on: "${disputedClaim}" (original source: ${originalSource})`,
      'IndependentResearcherAI',
      'High',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['correctedInformation', 'confidenceInCorrection'],
    unknownFields: ['correctedInformation'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'IndependentResearcherAI',
    result,
    evidence,
    status,
  };
}
