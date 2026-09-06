import React from 'react';
import {Check, Package, Truck, RotateCcw, Shield, Cpu, HardDrive, MemoryStick, Smartphone, Wifi, Battery, Camera, Weight, Palette} from 'lucide-react';

export default function ProductSpecs({product}: {product: any}) {
  const specs: {label: string; value: any; icon: any}[] = [];
  if (product.brand) specs.push({label: 'Brand', value: product.brand, icon: Package});
  if (product.category) specs.push({label: 'Category', value: product.category, icon: Smartphone});
  if (product.storage_options) specs.push({label: 'Storage', value: product.storage_options, icon: HardDrive});
  if (product.ram) specs.push({label: 'Memory (RAM)', value: product.ram, icon: MemoryStick});
  if (product.esim_support) specs.push({label: 'eSIM Support', value: product.esim_support, icon: Wifi});
  if (product.colors && product.colors.length > 0) specs.push({label: 'Available Colours', value: product.colors.join(', '), icon: Palette});

  const features = [
    {icon: Cpu, title: 'High Performance', desc: `Powered by ${product.brand || 'latest'} technology for fast, responsive performance.`},
    {icon: Shield, title: 'Built to Last', desc: 'Premium build quality with durable materials designed for everyday use.'},
    {icon: Battery, title: 'All-Day Battery', desc: 'Long-lasting battery life keeps you going from morning to night.'},
    {icon: Camera, title: 'Pro-Grade Camera', desc: 'Capture stunning photos and videos with advanced camera technology.'},
    {icon: Wifi, title: 'Superfast Connectivity', desc: 'Stay connected with Wi-Fi, Bluetooth, and 5G network support.'},
    {icon: Weight, title: 'Lightweight Design', desc: 'Sleek, lightweight form factor that feels great in your hand.'},
  ];

  const boxContents = [product.name, 'USB-C charging cable (1m)', 'Quick start guide', 'Warranty card', 'SIM ejector tool'];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">About this product</h2>
        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Key features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {specs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                    <td className="px-6 py-3.5 w-1/3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <spec.icon className="w-4 h-4 text-gray-400" />
                        {spec.label}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">What's in the box</h2>
        <div className="bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-2xl p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {boxContents.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-fuchsia-600 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Delivery & returns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-2xl p-5">
            <Truck className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-semibold text-sm mb-1">Free Delivery</h3>
            <p className="text-xs text-gray-500">Free standard delivery on orders over $50. Express options available.</p>
          </div>
          <div className="border border-gray-100 rounded-2xl p-5">
            <RotateCcw className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-semibold text-sm mb-1">30-Day Returns</h3>
            <p className="text-xs text-gray-500">Not satisfied? Return within 30 days for a full refund.</p>
          </div>
          <div className="border border-gray-100 rounded-2xl p-5">
            <Shield className="w-6 h-6 text-fuchsia-500 mb-2" />
            <h3 className="font-semibold text-sm mb-1">1-Year Warranty</h3>
            <p className="text-xs text-gray-500">All products come with a manufacturer's 1-year warranty.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
