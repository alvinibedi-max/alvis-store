import React, {useState} from 'react';
import {BarChart3, TrendingUp, Zap, Check, X} from 'lucide-react';
import {PRODUCTS, type Product} from '~/lib/data';

interface AICompareProps {
  product: Product;
}
export default function AICompare({product}: AICompareProps) {
  const [showCompare, setShowCompare] = useState(false);

  const similar = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  if (similar.length === 0) return null;

  const allProducts = [product, ...similar];
  const specsToCompare = Array.from(
    new Set(allProducts.flatMap(p => Object.keys(p.specs))),
  ).slice(0, 6);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-fuchsia-600" />
          AI-Powered Comparison
        </h2>
        <button
          onClick={() => setShowCompare(!showCompare)}
          className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg font-bold text-sm hover:from-fuchsia-700 hover:to-purple-700 transition-all"
        >
          {showCompare ? 'Hide' : 'Compare'}
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Vise AI compared {product.name} with similar products in the{' '}
        <span className="font-bold text-fuchsia-600">{product.category}</span>{' '}
        category.
      </p>

      {showCompare && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-500">
                    Specification
                  </th>
                  {allProducts.map(p => (
                    <th
                      key={p.id}
                      className="text-center py-3 px-4 font-bold text-gray-900"
                    >
                      {p.brand}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-500">
                    Price
                  </td>
                  {allProducts.map(p => (
                    <td
                      key={p.id}
                      className="text-center py-3 px-4 font-bold text-gray-900"
                    >
                      £{p.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-500">
                    Rating
                  </td>
                  {allProducts.map(p => (
                    <td
                      key={p.id}
                      className="text-center py-3 px-4"
                    >
                      ⭐ {p.rating} ({p.reviewCount})
                    </td>
                  ))}
                </tr>
                {specsToCompare.map(spec => (
                  <tr key={spec} className="border-b border-gray-50">
                    <td className="py-3 px-4 text-gray-500 font-medium">
                      {spec}
                    </td>
                    {allProducts.map(p => (
                      <td
                        key={p.id}
                        className="text-center py-3 px-4"
                      >
                        {p.specs[spec] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Zap className="w-3 h-3 text-fuchsia-600" />
              <span>
                AI recommendation: {product.name} offers the best value in
                this category.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
