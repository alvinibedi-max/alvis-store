import {FinalDecision, ProductSourcingEvaluation} from './types';
import {nowTimestamp} from './utils';

export function runFinalInspection(evaluation: ProductSourcingEvaluation): FinalDecision {
  const issues: string[] = [];

  if (!evaluation.quantityValidation.result.exactQuantity) {
    issues.push('Requested quantity is invalid or exceeds the maximum allowed per customer.');
  }

  if (evaluation.identity.result.brand === 'UNKNOWN' || evaluation.identity.result.exactModel === 'UNKNOWN') {
    issues.push('Product identity is incomplete.');
  }

  if (evaluation.price.status.completed === false) {
    issues.push('Price research is incomplete.');
  }

  if (evaluation.authenticity.result.authenticityConfidence <= 0) {
    issues.push('Authenticity confidence is not established.');
  }

  if (evaluation.profit.result.profitStatus === 'REJECT') {
    issues.push('Expected net profit is below the minimum threshold.');
  }

  if (evaluation.profit.result.profitStatus === 'NEEDS VERIFICATION') {
    issues.push('Profit calculation needs verification because key cost or revenue inputs are missing.');
  }

  if (issues.length > 0) {
    return {
      decision: 'HUMAN_REVIEW',
      reason: 'One or more critical issues require human review before purchasing.',
      confidence: 'Low',
      timestamp: nowTimestamp(),
      notes: issues,
    };
  }

  return {
    decision: 'APPROVE',
    reason: 'Sourcing evaluation passed all core checks and is eligible for purchase gating.',
    confidence: 'High',
    timestamp: nowTimestamp(),
    notes: ['Final inspector confirms the case is ready for purchase flow.'],
  };
}
