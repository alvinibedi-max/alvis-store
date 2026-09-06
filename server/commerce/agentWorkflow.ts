import {runOrchestration} from '../sourcing-service/orchestrator';
import type {SourcingReport} from '../sourcing-service/types';
import {addInternalAudit, getOrder} from './orderService';

const reports = new Map<string, SourcingReport>();

/**
 * Starts only after provider verification. Results are private operational data;
 * storefront routes must never return this report to a customer.
 *
 * Replace this in-memory runner with a durable queue worker before deployment so
 * jobs survive restarts and can be retried safely.
 */
export async function runPrivateSourcingWorkflow(orderId: string) {
  const order = getOrder(orderId);
  if (!order || order.state !== 'PAYMENT_VERIFIED') return;

  addInternalAudit(order, 'Private agent workflow', 'SOURCING_STARTED', 'Specialist sourcing checks started after verified provider payment.');
  try {
    const report = await runOrchestration({
      customerOrderId: order.id,
      productQuery: order.productSummary,
      quantity: order.quantity,
      customerCountry: 'UNSPECIFIED',
    });
    reports.set(order.id, report);
    addInternalAudit(order, 'Final Inspector', 'SOURCING_COMPLETED', `Private final decision: ${report.finalDecision.decision}.`);
  } catch (error) {
    addInternalAudit(order, 'Private agent workflow', 'SOURCING_FAILED', error instanceof Error ? error.message : 'Unknown sourcing workflow error.');
  }
}

/** Intended exclusively for a protected staff dashboard or worker, not storefront code. */
export function getPrivateSourcingReport(orderId: string) { return reports.get(orderId); }
