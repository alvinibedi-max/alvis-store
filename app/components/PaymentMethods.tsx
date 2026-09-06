import React from 'react';
import {CreditCard, Wallet, Smartphone, Banknote, Globe, Zap, Shield} from 'lucide-react';

const categories = [
  {title: 'Express Checkout', icon: Zap, methods: ['Shop Pay', 'Apple Pay', 'Google Pay', 'Amazon Pay']},
  {title: 'Traditional Cards', icon: CreditCard, methods: ['Visa', 'Mastercard', 'American Express', 'Discover', 'JCB', 'UnionPay']},
  {title: 'Trust & Alternative Wallets', icon: Wallet, methods: ['PayPal', 'Venmo', 'Click to Pay']},
  {title: 'Buy Now, Pay Later (BNPL)', icon: Banknote, methods: ['Klarna', 'Affirm', 'Afterpay / Clearpay', 'PayPal Pay in 4', 'Zip']},
  {title: 'European Local Methods', icon: Globe, methods: ['iDEAL', 'Bancontact', 'Sofort / Giropay', 'Cartes Bancaires', 'BLIK', 'EPS', 'Swish', 'MobilePay']},
  {title: 'Asia-Pacific Leaders', icon: Smartphone, methods: ['Alipay', 'WeChat Pay', 'GrabPay']},
  {title: 'Latin American Leaders', icon: Globe, methods: ['Pix', 'OXXO']},
];

export default function PaymentMethods() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <Shield className="w-4 h-4 text-green-600" />
        <h3 className="font-bold text-sm">Accepted Payment Methods</h3>
      </div>
      <p className="text-xs text-gray-400 mb-6">All transactions are SSL encrypted and PCI compliant</p>

      <div className="space-y-5">
        {categories.map(cat => (
          <div key={cat.title}>
            <div className="flex items-center gap-2 mb-2">
              <cat.icon className="w-4 h-4 text-gray-500" />
              <p className="text-xs font-semibold text-gray-600">{cat.title}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.methods.map(method => (
                <span key={method} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-gray-300 transition-colors">
                  {method}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
