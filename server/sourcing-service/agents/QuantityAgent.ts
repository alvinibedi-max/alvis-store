import {AgentResult, EvidenceRecord, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export async function runQuantityValidation(order: OrderRequest): Promise<AgentResult<{exactQuantity: boolean; requestedQuantity: number; approvedQuantity: number}>> {
  const maxUnits = order.maxUnitsPerCustomer ?? 3;
  const exactQuantity = order.quantity > 0 && order.quantity <= maxUnits;
  const evidence: EvidenceRecord[] = [
    buildEvidence(
      'Requested quantity validated',
      `Customer requested ${order.quantity} units, max allowed ${maxUnits}`,
      'QuantityAgent',
      'High',
    ),
  ];

  const status: VerificationStatus = {
    completed: true,
    missingFields: [],
    unknownFields: [],
    confidence: 'High',
  };

  return {
    agentName: 'QuantityAgent',
    result: {
      exactQuantity,
      requestedQuantity: order.quantity,
      approvedQuantity: exactQuantity ? order.quantity : Math.min(order.quantity, maxUnits),
    },
    evidence,
    status,
  };
}
