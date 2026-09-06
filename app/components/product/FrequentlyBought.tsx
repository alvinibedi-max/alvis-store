import React, {useState, useEffect} from 'react';
import {Link} from '@remix-run/react';
import {Star, Plus, Minus, ShoppingBag} from 'lucide-react';
import {toast} from 'sonner';
import {useCartForm} from '~/lib/cart';

export default function FrequentlyBought({mainProduct}: {mainProduct: any}) {
  const [items, setItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const {addItem} = useCartForm();

  useEffect(() => {
    const load = async () => {
      try {
        const all = await fetch('/api/products').then(r => r.json());
        const related = all.filter((p: any) => p.id !== mainProduct.id).slice(0, 6);
        setItems(related);
        const q: Record<string, number> = {};
        related.forEach((p: any) => { q[p.id] = 1; });
        setQuantities(q);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    if (mainProduct) load();
  }, [mainProduct]);

  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => ({...prev, [id]: Math.max(0, (prev[id] || 1) + delta)}));
  };

  const addBundleToCart = async () => {
    const selected = items.filter(i => quantities[i.id] > 0);
    if (selected.length === 0) { toast.error('Select at least one item'); return; }
    try {
      for (const item of selected) {
        await addItem({
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: quantities[item.id],
          image_url: item.image_url,
        });
      }
      toast.success('Bundle added to cart!');
    } catch (e) { toast.error('Failed to add bundle'); }
  };

  if (loading || items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4">Frequently bought together</h2>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
        <div className="space-y-3">
          {items.map(item => {
            const qty = quantities[item.id] || 0;
            const discount = item.original_price ? Math.round((1 - item.price / item.original_price) * 100) : 0;
            return (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <Link to={`/products/${item.id}`} className="flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-50" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <p className="text-xs font-medium line-clamp-2 hover:text-fuchsia-600">{item.name}</p>
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5">
                    {item.rating && (
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] text-gray-500">{item.rating}</span>
                      </div>
                    )}
                    <span className="text-xs font-bold">{item.brand}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-bold">${item.price}</span>
                    {item.original_price && <span className="text-[10px] text-gray-400 line-through">${item.original_price}</span>}
                    {discount > 0 && <span className="text-[10px] text-green-600 font-bold">{discount}% off</span>}
                  </div>
                </div>
                <div className="flex items-center border border-gray-200 rounded-full flex-shrink-0">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={addBundleToCart}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl py-2.5 text-sm font-bold hover:from-fuchsia-700 hover:to-purple-700 transition-all"
        >
          <ShoppingBag className="w-4 h-4" /> Add Selected to Cart
        </button>
      </div>
    </section>
  );
}
