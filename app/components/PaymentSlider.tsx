import React, {useState, useRef} from 'react';
import {Search, Check, ChevronLeft, ChevronRight, Zap, CreditCard, Wallet, Banknote, Globe, Smartphone, Shield} from 'lucide-react';

const categories = [
  {title: 'Express Checkout', icon: Zap, color: 'from-fuchsia-500 to-purple-600', methods: ['Shop Pay', 'Apple Pay', 'Google Pay', 'Amazon Pay']},
  {title: 'Traditional Cards', icon: CreditCard, color: 'from-blue-500 to-cyan-500', methods: ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB', 'UnionPay']},
  {title: 'Trust & Wallets', icon: Wallet, color: 'from-teal-500 to-emerald-500', methods: ['PayPal', 'Venmo', 'Click to Pay']},
  {title: 'Buy Now, Pay Later', icon: Banknote, color: 'from-orange-500 to-amber-500', methods: ['Klarna', 'Affirm', 'Afterpay / Clearpay', 'PayPal Pay in 4', 'Zip']},
  {title: 'European Local', icon: Globe, color: 'from-indigo-500 to-blue-600', methods: ['iDEAL', 'Bancontact', 'Sofort / Giropay', 'Cartes Bancaires', 'BLIK', 'EPS', 'Swish', 'MobilePay']},
  {title: 'Asia-Pacific', icon: Smartphone, color: 'from-red-500 to-rose-600', methods: ['Alipay', 'WeChat Pay', 'GrabPay']},
  {title: 'Latin American', icon: Globe, color: 'from-green-500 to-lime-600', methods: ['Pix', 'OXXO']},
];

const allMethods = categories.flatMap(cat => cat.methods.map(m => ({name: m, category: cat.title, color: cat.color, icon: cat.icon})));

export default function PaymentSlider({selected, onSelect}: {selected?: string; onSelect: (method: string) => void}) {
  const [search, setSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = search.trim() ? allMethods.filter(m => m.name.toLowerCase().includes(search.toLowerCase())) : allMethods;

  const scroll = (dir: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({left: dir * 300, behavior: 'smooth'});
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Shield className="w-4 h-4 text-green-400" />
          <h3 className="font-bold text-sm text-white">Select Payment Method</h3>
        </div>
        <div className="relative flex-1 max-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input type="text" placeholder="Search payments..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-white/40" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/50 text-sm text-center py-4">No payment methods found.</p>
      ) : (
        <div className="relative">
          <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-7 py-1">
            {filtered.map(method => {
              const isSelected = selected === method.name;
              return (
                <button key={method.name} type="button" onClick={() => onSelect(method.name)} className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all bg-gradient-to-r ${method.color} text-white ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-105 shadow-lg' : 'opacity-80 hover:opacity-100 hover:scale-105'}`}>
                  {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                  {method.name}
                </button>
              );
            })}
          </div>
          <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
