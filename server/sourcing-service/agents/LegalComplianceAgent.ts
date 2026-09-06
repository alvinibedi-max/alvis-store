import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type LegalComplianceResult = {
  legalToImport: boolean | 'UNKNOWN';
  shippingRestricted: boolean | 'UNKNOWN';
  complianceNotes: string | 'UNKNOWN';
};

export async function runLegalCompliance(order: OrderRequest): Promise<AgentResult<LegalComplianceResult>> {
  const result: LegalComplianceResult = {
    legalToImport: 'UNKNOWN',
    shippingRestricted: 'UNKNOWN',
    complianceNotes: 'UNKNOWN',
  };

  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Legal compliance research initialized',
      `Starting legal/import assessment for query: ${order.productQuery}`,
      'LegalComplianceAgent',
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
    agentName: 'LegalComplianceAgent',
    result,
    evidence,
    status,
  };
}
