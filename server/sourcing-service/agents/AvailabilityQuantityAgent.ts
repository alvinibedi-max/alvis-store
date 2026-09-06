import {AgentResult, Unknownable, VerificationStatus, OrderRequest} from '../types';
import {buildEvidence} from '../utils';

export type AvailabilityQuantityResult = {
  stockAvailable: boolean;
  currentStock: Unknownable<number>;
  requestedQuantity: number;
  canFulfill: boolean;
  backorderStatus: Unknownable<'Available' | 'Backorder' | 'Preorder' | 'Discontinued'>;
  estimatedShipDate: Unknownable<string>;
  maxOrderLimit: Unknownable<number>;
  availabilityConfidence: number;
};

export async function runAvailabilityQuantity(order: OrderRequest): Promise<AgentResult<AvailabilityQuantityResult>> {
  const result: AvailabilityQuantityResult = {
    stockAvailable: false,
    currentStock: 'UNKNOWN',
    requestedQuantity: order.quantity,
    canFulfill: false,
    backorderStatus: 'UNKNOWN',
    estimatedShipDate: 'UNKNOWN',
    maxOrderLimit: 'UNKNOWN',
    availabilityConfidence: 0,
  };

  const evidence = [
    buildEvidence(
      'Availability & quantity check started',
      `Verifying stock for: ${order.productQuery}. Requested: ${order.quantity} unit(s). Max allowed per order: 3 units`,
      'AvailabilityQuantityAgent',
      'Medium',
    ),
  ];

  const status: VerificationStatus = {
    completed: false,
    missingFields: ['stockAvailable', 'currentStock', 'backorderStatus'],
    unknownFields: ['currentStock', 'backorderStatus', 'estimatedShipDate'],
    confidence: 'Unknown',
  };

  return {
    agentName: 'AvailabilityQuantityAgent',
    result,
    evidence,
    status,
  };
}
