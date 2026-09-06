import React, {useState} from 'react';
import {FileText, Settings, BookOpen, AlertTriangle} from 'lucide-react';

export default function ProductTabs({product}: {product: any}) {
  const [active, setActive] = useState('description');

  const tabs = [
    {key: 'description', label: 'Description', icon: FileText},
    {key: 'specs', label: 'Specifications', icon: Settings},
    {key: 'instructions', label: 'Instructions', icon: BookOpen},
    {key: 'safety', label: 'Safety', icon: AlertTriangle},
  ];

  const specs = [
    {label: 'Category', value: product.category},
    {label: 'Brand', value: product.brand},
    {label: 'Storage', value: product.storage_options},
    {label: 'RAM', value: product.ram},
    {label: 'eSIM Support', value: product.esim_support},
    {label: 'In Stock', value: product.in_stock ? 'Yes' : 'No'},
    {label: 'Rating', value: product.rating ? `${product.rating} / 5` : '—'},
  ].filter(s => s.value);

  return (
    <section className="mt-12">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                active === tab.key ? 'border-fuchsia-600 text-fuchsia-600' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          {active === 'description' && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description || 'No description available.'}</p>
            </div>
          )}

          {active === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-bold text-gray-500">Specification</th>
                    <th className="text-left py-2 font-bold text-gray-500">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((s, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 pr-4 text-gray-500 font-medium">{s.label}</td>
                      <td className="py-2.5 font-semibold">{String(s.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-4 italic">For deeper technical analysis and demand forecasting, ask Narvis — our Garvis AI-powered assistant.</p>
            </div>
          )}

          {active === 'instructions' && (
            <div className="text-sm text-gray-600 space-y-3">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Unboxing & Initial Setup</h4>
                <p>Unbox your {product.name} and connect it to a power adapter using the included cable. Charge fully before first use. Power on and follow the on-screen setup instructions.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">SIM Card Installation</h4>
                <p>Open the SIM tray and insert your SIM card according to the instructions. Close the tray gently.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Apps & Features</h4>
                <p>Download your favorite apps. Utilize the various features such as photography, video recording, navigation, and more.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Charging & Battery</h4>
                <p>Charge using the original charger and cable. Avoid non-original chargers to prevent damage.</p>
              </div>
            </div>
          )}

          {active === 'safety' && (
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong className="text-gray-900">Battery Safety:</strong> Use only original or recommended chargers and cables. Avoid overcharging.</p>
              <p><strong className="text-gray-900">Screen Protection:</strong> Avoid touching the screen with sharp objects. Wipe gently with a soft cloth.</p>
              <p><strong className="text-gray-900">Temperature:</strong> Avoid use in extreme temperatures (-20°C to 45°C).</p>
              <p><strong className="text-gray-900">Water Resistance:</strong> Not recommended for prolonged water exposure, despite IP ratings.</p>
              <p><strong className="text-gray-900">Maintenance:</strong> Regularly check charging ports for dust or moisture buildup.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
