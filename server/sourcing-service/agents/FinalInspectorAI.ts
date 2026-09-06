import {ProductSourcingEvaluation, FinalDecision, VerificationStatus} from '../types';
import {buildEvidence, nowTimestamp} from '../utils';

export type FinalInspectionResult = {
  caseReviewComplete: boolean;
  allChecksPassed: boolean;
  criticalIssuesFound: number;
  overallConfidence: number;
  finalRecommendation: 'APPROVE' | 'HUMAN_REVIEW' | 'REJECT';
  inspectionNotes: string;
};

export async function runFinalInspector(
  evaluation: ProductSourcingEvaluation,
): Promise<FinalDecision> {
  // Verify all critical fields
  const issues: string[] = [];

  // Product identity check
  const identityUnknowns = Object.values(evaluation.identity.result).filter(v => v === 'UNKNOWN').length;
  if (identityUnknowns > 0) {
    issues.push(`Product identity has ${identityUnknowns} unknown fields`);
  }

  // Authenticity check
  if (evaluation.authenticity.result.authenticityConfidence < 50) {
    issues.push('Authenticity confidence is below 50%');
  }

  // Profit check
  if (evaluation.profit.result.profitStatus === 'REJECT') {
    issues.push('Expected profit below £45 threshold');
  }

  // Seller check
  if (typeof evaluation.seller.result.trustScore !== 'number' || evaluation.seller.result.trustScore < 60) {
    issues.push('Seller trust score below 60/100');
  }

  // Compatibility check
  if (evaluation.compatibility.result.compatibilityConfidence < 50) {
    issues.push('Compatibility confidence below threshold');
  }

  // Warranty check
  if (!evaluation.warranty.result.warrantyAvailable) {
    issues.push('No warranty available');
  }

  // Legal check
  if (evaluation.legalCompliance.result.legalStatus !== 'COMPLIANT') {
    issues.push('Legal/import compliance issues detected');
  }

  // Quantity check
  if (!evaluation.quantityValidation.result.exactQuantity) {
    issues.push('Cannot fulfill exact requested quantity');
  }

  const evidence = [
    buildEvidence(
      'Final Inspector review complete',
      `Reviewed all 21 specialist AI conclusions. Critical issues found: ${issues.length}. Confidence: ${100 - issues.length * 10}%`,
      'FinalInspectorAI',
      issues.length === 0 ? 'High' : 'Medium',
    ),
    ...issues.map(issue =>
      buildEvidence(
        'Critical issue detected',
        issue,
        'FinalInspectorAI',
        'High',
      ),
    ),
  ];

  // Hard gates are never overridable by confidence or another AI.
  const hardReject = evaluation.legalCompliance.result.legalStatus === 'NON_COMPLIANT' || evaluation.quantityValidation.result.exactQuantity === false || evaluation.authenticity.result.authenticityConfidence < 30;
  let recommendation: 'APPROVE' | 'HUMAN_REVIEW' | 'REJECT' = hardReject ? 'REJECT' : 'APPROVE';
  if (!hardReject && issues.length > 0) recommendation = 'HUMAN_REVIEW';

  const decision: FinalDecision = {
    decision: recommendation,
    reason:
      issues.length === 0
        ? 'Final Inspector: All checks passed. Order approved.'
        : issues.length > 2
          ? `Final Inspector: ${issues.length} critical issues found. Order rejected.`
          : `Final Inspector: ${issues.length} issue(s) require attention. Human review recommended.`,
    confidence: 'Medium',
    timestamp: nowTimestamp(),
    notes: issues,
  };

  return decision;
}
