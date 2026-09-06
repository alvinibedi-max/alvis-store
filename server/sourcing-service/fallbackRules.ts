export type FallbackDecision = {
  shouldUsePreferredSupplier: boolean;
  shouldTryAlternativeSupplier: boolean;
  shouldEscalateToHumanReview: boolean;
  reason: string;
  nextAction: string;
};

export function evaluateSupplierFallback(
  brand: string | undefined,
  productFound: boolean,
  supplierFound: boolean,
  supplierInfoMissing: boolean,
  priceMissing: boolean,
  authenticityUnclear: boolean,
  compatibilityUnclear: boolean,
  warrantyUnclear: boolean,
  legalUnclear: boolean,
): FallbackDecision {
  if (!brand) {
    return {
      shouldUsePreferredSupplier: false,
      shouldTryAlternativeSupplier: false,
      shouldEscalateToHumanReview: true,
      reason: 'Brand could not be identified from the customer order.',
      nextAction: 'Escalate to human review and ask for the exact product brand/model.',
    };
  }

  if (!productFound) {
    return {
      shouldUsePreferredSupplier: false,
      shouldTryAlternativeSupplier: false,
      shouldEscalateToHumanReview: true,
      reason: 'The product could not be confidently identified.',
      nextAction: 'Escalate to human review before purchasing.',
    };
  }

  if (!supplierFound || supplierInfoMissing) {
    return {
      shouldUsePreferredSupplier: true,
      shouldTryAlternativeSupplier: true,
      shouldEscalateToHumanReview: false,
      reason: 'Preferred supplier information is missing, so the system should try the ranked supplier list first.',
      nextAction: 'Try the preferred supplier from the ranked list, then try the next ranked alternative if needed.',
    };
  }

  if (priceMissing || authenticityUnclear || compatibilityUnclear || warrantyUnclear || legalUnclear) {
    return {
      shouldUsePreferredSupplier: true,
      shouldTryAlternativeSupplier: true,
      shouldEscalateToHumanReview: true,
      reason: 'Critical information is missing or uncertain, so the preferred supplier flow should be attempted first and then escalated if it still cannot be verified.',
      nextAction: 'Try the preferred supplier and one alternative; if verification still fails, escalate to human review.',
    };
  }

  return {
    shouldUsePreferredSupplier: true,
    shouldTryAlternativeSupplier: true,
    shouldEscalateToHumanReview: false,
    reason: 'All key checks are present; preferred supplier flow can proceed.',
    nextAction: 'Continue with the ranked supplier list and select the best verified option.',
  };
}
