import React, {useState} from 'react';
import {X, Lock, CheckCircle, Loader2, ChevronRight, Truck} from 'lucide-react';
import {toast} from 'sonner';
import {useCartStore} from '~/lib/cart';
import {useNavigate} from '@remix-run/react';

const PAYMENT_METHODS = [
  {name: 'Google Pay', short: 'G Pay', gradient: 'from-white to-gray-100', textColor: 'text-gray-800', border: 'border-gray-300', logo: 'G Pay'},
  {name: 'Apple Pay', short: 'Apple Pay', gradient: 'from-black to-gray-800', textColor: 'text-white', border: 'border-gray-700', logo: ' Pay'},
  {name: 'PayPal', short: 'PayPal', gradient: 'from-[#0070ba] to-[#003087]', textColor: 'text-white', border: 'border-blue-700', logo: 'PayPal'},
  {name: 'Shop Pay', short: 'Shop Pay', gradient: 'from-[#5a31f4] to-[#9536f4]', textColor: 'text-white', border: 'border-purple-600', logo: 'Shop Pay'},
];

export default function ExpressCheckout({items, total, onComplete}: {items: any[]; total: number; onComplete?: (orderNumber: string, delivery: string) => void}) {
  const [activeMethod, setActiveMethod] = useState<any>(null);
  const [stage, setStage] = useState<'form' | 'processing' | 'success'>('form');
  const [shipping, setShipping] = useState({email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'United States'});
  const navigate = useNavigate();
  const clearCart = useCartStore(state => state.clearCart);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setShipping({...shipping, [e.target.name]: e.target.value});
  const openSheet = (method: any) => {setActiveMethod(method); setStage('form');};
  const closeSheet = () => {setActiveMethod(null); setStage('form');};

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zip'];
    const missing = required.filter(f => !shipping[f].trim());
    if (missing.length > 0) {toast.error('Please fill in all shipping fields'); return;}

    setStage('processing');
    await new Promise(r => setTimeout(r, 2500));

    try {
      const orderNumber = 'ALV-' + Date.now().toString().slice(-8);
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

      // In a real app, this would create an order via Shopify API
      clearCart();
      setStage('success');

      setTimeout(() => {
        if (onComplete) {
          onComplete(orderNumber, estimatedDelivery.toISOString());
        } else {
          navigate(`/order-confirmation?order=${orderNumber}&delivery=${estimatedDelivery.toISOString()}`);
        }
      }, 1800);
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      setStage('form');
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">Express checkout</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map(method => (
            <button key={method.name} onClick={() => openSheet(method)} className={`flex items-center justify-center h-11 rounded-xl bg-gradient-to-r ${method.gradient} ${method.textColor} border ${method.border} font-bold text-sm hover:opacity-90 transition-opacity`}>
              {method.logo}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <Lock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">Secure express checkout</span>
        </div>
      </div>

      {activeMethod && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4" onClick={closeSheet}>
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {stage === 'form' && (
              <>
                <div className={`bg-gradient-to-r ${activeMethod.gradient} px-5 py-4 flex items-center justify-between ${activeMethod.textColor} sm:rounded-t-2xl`}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{activeMethod.logo}</span>
                  </div>
                  <button onClick={closeSheet} className="opacity-70 hover:opacity-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePay} className="p-5 space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-500">Order Total</span>
                      <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-1">
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs text-gray-500">
                          <span className="truncate pr-2">{item.product_name} × {item.quantity}</span>
                          <span className="font-medium whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-gray-400" /> Shipping Address
                    </h3>
                    <div className="space-y-2">
                      <input name="email" type="email" value={shipping.email} onChange={handleChange} placeholder="Email address" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                      <div className="grid grid-cols-2 gap-2">
                        <input name="firstName" value={shipping.firstName} onChange={handleChange} placeholder="First name" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                        <input name="lastName" value={shipping.lastName} onChange={handleChange} placeholder="Last name" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                      </div>
                      <input name="address" value={shipping.address} onChange={handleChange} placeholder="Street address" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                      <div className="grid grid-cols-3 gap-2">
                        <input name="city" value={shipping.city} onChange={handleChange} placeholder="City" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                        <input name="state" value={shipping.state} onChange={handleChange} placeholder="State" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                        <input name="zip" value={shipping.zip} onChange={handleChange} placeholder="ZIP" required className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-fuchsia-500" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className={`w-full h-12 rounded-xl bg-gradient-to-r ${activeMethod.gradient} ${activeMethod.textColor} border ${activeMethod.border} font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
                    <Lock className="w-4 h-4" />
                    Pay ${total.toFixed(2)} with {activeMethod.name}
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </>
            )}

            {stage === 'processing' && (
              <div className="p-12 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activeMethod.gradient} flex items-center justify-center mb-4`}>
                  <Loader2 className={`w-8 h-8 animate-spin ${activeMethod.textColor}`} />
                </div>
                <h3 className="font-bold text-lg mb-1">Processing your payment...</h3>
                <p className="text-sm text-gray-500">Confirming with {activeMethod.name}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                  <Lock className="w-3 h-3" />
                  Your payment is encrypted and secure
                </div>
              </div>
            )}

            {stage === 'success' && (
              <div className="p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">Payment Successful!</h3>
                <p className="text-sm text-gray-500">Redirecting to your order confirmation...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
