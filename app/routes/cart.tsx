import {useLoaderData, type LoaderFunctionArgs} from '@shopify/hydrogen';
import {useCartForm} from '~/lib/cart';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ViseChat from '~/components/ViseChat';
import {Trash2, Plus, Minus, ShoppingCart} from 'lucide-react';

export const loader = async () => {
  return {};
};

export default function Cart() {
  const {items, getTotal, getCount, updateQuantity, removeItem, clearCart} = useCartForm();
  const total = getTotal();
  const itemCount = getCount();

  if (itemCount === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-gray-900 font-black text-3xl mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-lg font-bold hover:from-fuchsia-700 hover:to-purple-700 transition-all"
          >
            Start Shopping
          </a>
        </main>
        <Footer />
        <ViseChat />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-gray-900 font-black text-3xl mb-8">
          Your Cart ({itemCount} items)
        </h1>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
            >
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.product_name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="font-bold text-gray-900 w-20 text-right">
                £{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(item.id!)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">£{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-bold">FREE</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-black">
              <span>Total</span>
              <span className="text-purple-600">£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-fuchsia-700 hover:to-purple-700 transition-all"
            >
              Proceed to Checkout
            </a>
            <button
              onClick={clearCart}
              className="w-full py-2 text-gray-600 hover:text-red-600 font-medium transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <ViseChat />
    </div>
  );
}
