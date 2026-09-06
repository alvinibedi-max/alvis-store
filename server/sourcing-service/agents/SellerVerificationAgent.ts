import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type SellerResult = {
  sellerName: string;
  sellerRating: number | 'UNKNOWN';
  sellerCountry: string | 'UNKNOWN';
  sellerAgeMonths: number | 'UNKNOWN';
  authorized: boolean | 'UNKNOWN';
};

export async function runSellerVerification(order: OrderRequest): Promise<AgentResult<SellerResult>> {
  const result: SellerResult = {
    sellerName: 'UNKNOWN',
    sellerRating: 'UNKNOWN',
    sellerCountry: 'UNKNOWN',
    sellerAgeMonths: 'UNKNOWN',
    authorized: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Seller verification initialized',
      `Starting seller verification for query: ${order.productQuery}`,
      'SellerVerificationAgent',
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
    agentName: 'SellerVerificationAgent',
    result,
    evidence,
    status,
  };
}
