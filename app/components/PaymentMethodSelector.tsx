import {useMemo, useState} from 'react';
import {ChevronDown, CreditCard, Lock, Search} from 'lucide-react';
import {PAYMENT_GROUPS, getMethodFormType} from '~/lib/payment-methods';

/** Selects a method only. Credentials are collected by the gateway's hosted checkout. */
export default function PaymentMethodSelector({selected, onSelect}: {selected?: string; onSelect: (method: string) => void}) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({cards: true, wallets: true});
  const formType = selected ? getMethodFormType(selected) : null;
  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? PAYMENT_GROUPS.map(group => ({...group, methods: group.methods.filter(method => method.toLowerCase().includes(query))})).filter(group => group.methods.length) : PAYMENT_GROUPS;
  }, [search]);

  return <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
    <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white"><CreditCard className="h-5 w-5" /> Payment method</h2>
      <p className="mt-1 text-xs text-fuchsia-100">Payment details are completed securely with the selected provider.</p>
    </div>
    <div className="p-4">
      <div className="relative mb-4"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search payment methods…" className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-fuchsia-500" /></div>
      <div className="max-h-[400px] space-y-3 overflow-y-auto">
        {groups.map(group => <div key={group.id} className="overflow-hidden rounded-xl border border-gray-100">
          <button type="button" onClick={() => setExpanded(current => ({...current, [group.id]: !current[group.id]}))} className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-sm font-semibold"><span>{group.icon} {group.label}</span><ChevronDown className={`h-4 w-4 transition-transform ${expanded[group.id] ? 'rotate-180' : ''}`} /></button>
          {expanded[group.id] && <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3">{group.methods.map(method => <button key={method} type="button" onClick={() => onSelect(method)} className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium ${selected === method ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-500' : 'border-gray-200 hover:bg-gray-50'}`}>{method}</button>)}</div>}
        </div>)}
      </div>
      {selected && <div className="mt-4 flex gap-2 rounded-lg border border-purple-100 bg-purple-50 p-4 text-xs text-purple-900"><Lock className="h-4 w-4 shrink-0" /><p><strong>{selected}</strong> will open its secure {formType === 'bank' ? 'payment instructions' : 'hosted checkout'} after order creation. Alvis does not collect or store card numbers, security codes, bank details, or wallet passwords.</p></div>}
    </div>
  </div>;
}
