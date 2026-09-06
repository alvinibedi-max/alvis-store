import {FinalDecision, ProductSourcingEvaluation} from './types';
import {nowTimestamp} from './utils';

export function buildHumanReviewNotice(evaluation: ProductSourcingEvaluation, issue: string): FinalDecision {
  return {
    decision: 'HUMAN_REVIEW',
    reason: issue,
    confidence: 'Low',
    timestamp: nowTimestamp(),
    notes: [
      `Order ${evaluation.request.customerOrderId} requires human review.`,
      `Product query: ${evaluation.request.productQuery}.`,
      `Quantity: ${evaluation.request.quantity}.`,
      `Issue: ${issue}.`,
      'Review the evidence and resolve missing or conflicting information.',
    ],
  };
}
