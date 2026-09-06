import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type ListingAccuracyResult = {
  titleAccuracy: boolean;
  descriptionMatches: boolean;
  imageAuthenticity: boolean;
  specificationAccuracy: boolean;
  modelNumberMatch: boolean;
  storageMatch: boolean;
  colorMatch: boolean;
  conflictCount: Unknownable<number>;
  accuracyScore: number;
};

export async function runListingAccuracy(order: OrderRequest): Promise<AgentResult<ListingAccuracyResult>> {
  const result: ListingAccuracyResult = {
    titleAccuracy: false,
    descriptionMatches: false,
    imageAuthenticity: false,
    specificationAccuracy: false,
    modelNumberMatch: false,
    storageMatch: false,
    colorMatch: false,
    conflictCount: 'UNKNOWN',
    accuracyScore: 0,
  };

  const evidence = [
    buildEvidence(
      'Listing accuracy verification started',
      `Comparing title, description, images, and specs for: ${order.productQuery}. Detect mismatches`,
      'ListingAccuracyAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['titleAccuracy', 'specificationAccuracy', 'conflictCount'],
    unknownFields: ['conflictCount'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'ListingAccuracyAgent',
    result,
    evidence,
    status,
  };
}
