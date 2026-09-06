import {useEffect, useState} from 'react';
import {AlertTriangle, CheckCircle2, LoaderCircle, Search, ShieldCheck, XCircle} from 'lucide-react';

type AgentStep = {
  name: string;
  detail: string;
};

export type SourcingOrder = {
  customerOrderId: string;
  productQuery: string;
  quantity: number;
  customerCountry: string;
};

type FinalDecision = {
  decision: 'APPROVE' | 'HUMAN_REVIEW' | 'REJECT';
  reason: string;
  confidence: string;
};

const AGENT_STEPS: AgentStep[] = [
  {name: 'Product identification', detail: 'Matching the exact product, model, and specification.'},
  {name: 'Quantity validation', detail: 'Checking the requested quantity against purchase limits.'},
  {name: 'Price research', detail: 'Comparing current market price and total landed cost.'},
  {name: 'Seller verification', detail: 'Assessing seller history, rating, and trust signals.'},
  {name: 'Product history', detail: 'Reviewing reviews, known issues, recalls, and product age.'},
  {name: 'Compatibility', detail: 'Checking compatibility with the delivery market.'},
  {name: 'Warranty', detail: 'Confirming coverage and whether it applies in the destination.'},
  {name: 'Legal compliance', detail: 'Checking import, shipping, and market restrictions.'},
  {name: 'Authenticity', detail: 'Looking for counterfeit and authenticity risk indicators.'},
  {name: 'Profit calculation', detail: 'Calculating expected margin after fees and delivery costs.'},
  {name: 'Risk assessment', detail: 'Combining supplier, quality, legal, and compatibility risk.'},
  {name: 'Region and version', detail: 'Checking region-specific model and network differences.'},
  {name: 'Lock status', detail: 'Verifying carrier, activation, and region lock status.'},
  {name: 'Resale price', detail: 'Estimating the current resale value.'},
  {name: 'Demand analysis', detail: 'Measuring current demand in the target market.'},
  {name: 'Historical price', detail: 'Comparing today\'s price with historical pricing.'},
  {name: 'Listing accuracy', detail: 'Checking whether the listing claims match the product.'},
  {name: 'Availability', detail: 'Confirming stock and fulfilment availability.'},
  {name: 'Condition', detail: 'Reviewing cosmetic and functional condition.'},
  {name: 'Anomaly detection', detail: 'Flagging unusual price, seller, or listing patterns.'},
  {name: 'Supplier preference', detail: 'Comparing the source against preferred supplier criteria.'},
];

export function SourcingRunPanel({
  order,
  onClose,
  onApproved,
}: {
  order: SourcingOrder;
  onClose: () => void;
  onApproved: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<FinalDecision | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setInterval(() => {
      setActiveStep(current => Math.min(current + 1, AGENT_STEPS.length));
    }, 220);

    fetch('/api/sourcing', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order),
    })
      .then(async response => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'The agent run could not be completed.');
        return payload;
      })
      .then(payload => {
        if (!cancelled) {
          setActiveStep(AGENT_STEPS.length);
          setResult(payload.finalDecision);
        }
      })
      .catch(requestError => {
        if (!cancelled) {
          setActiveStep(AGENT_STEPS.length);
          setError(requestError instanceof Error ? requestError.message : 'The agent run could not be completed.');
        }
      });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [order]);

  const isApproved = result?.decision === 'APPROVE';
  const isFinished = Boolean(result || error);

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="agent-run-title">
      <div className="mx-auto my-8 max-w-2xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5">
          <div>
            <div className="flex items-center gap-2 text-purple-700">
              <Search className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Live agent run</span>
            </div>
            <h2 id="agent-run-title" className="mt-1 text-xl font-black text-gray-900">Checking this order before confirmation</h2>
            <p className="mt-1 text-sm text-gray-600">{order.productQuery} - {order.quantity} unit{order.quantity === 1 ? '' : 's'} - {order.customerCountry}</p>
          </div>
          {isFinished && <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded" aria-label="Close agent run">X</button>}
        </div>

        <div className="max-h-[52vh] overflow-y-auto divide-y divide-gray-100">
          {AGENT_STEPS.map((step, index) => {
            const state = index < activeStep ? 'complete' : index === activeStep && !isFinished ? 'running' : 'waiting';
            return <div key={step.name} className="flex gap-3 px-5 py-3">
              {state === 'complete' ? <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-emerald-600" /> : state === 'running' ? <LoaderCircle className="mt-0.5 w-5 h-5 shrink-0 text-purple-600 animate-spin" /> : <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 border-gray-200" />}
              <div><p className="text-sm font-bold text-gray-900">{step.name}</p><p className="text-xs text-gray-600">{state === 'running' ? step.detail : state === 'complete' ? 'Check completed.' : 'Waiting to run.'}</p></div>
            </div>;
          })}
          <div className="flex gap-3 bg-gray-50 px-5 py-4">
            <ShieldCheck className="mt-0.5 w-5 h-5 shrink-0 text-purple-700" />
            <div><p className="text-sm font-bold text-gray-900">Final inspector</p><p className="text-xs text-gray-600">{isFinished ? 'Reviewed every specialist result and issued the final decision.' : 'Will review all specialist findings and decide whether the order can proceed.'}</p></div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-5">
          {!isFinished && <p className="text-sm text-gray-700">The agents are working in parallel. This stays open so you can see every check being made.</p>}
          {error && <div className="flex items-start gap-3 text-red-700"><XCircle className="w-5 h-5 shrink-0" /><div><p className="font-bold">Agent check unavailable</p><p className="text-sm">{error}</p></div></div>}
          {result && <div className="flex items-start gap-3"><div>{isApproved ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <AlertTriangle className="w-6 h-6 text-amber-600" />}</div><div><p className="font-black text-gray-900">{result.decision === 'APPROVE' ? 'Order approved' : result.decision === 'HUMAN_REVIEW' ? 'Human review required' : 'Order rejected'}</p><p className="mt-1 text-sm text-gray-700">{result.reason}</p><p className="mt-1 text-xs text-gray-500">Confidence: {result.confidence}</p></div></div>}
          {isFinished && <div className="mt-5 flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded">Close</button>{isApproved && <button onClick={onApproved} className="px-4 py-2 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded">Confirm order</button>}</div>}
        </div>
      </div>
    </div>
  );
}
