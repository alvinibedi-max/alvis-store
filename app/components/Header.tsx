import {ShoppingCart, Search, Menu, X} from 'lucide-react';
import {useState} from 'react';
import {Link} from '@remix-run/react';
import {getCartCount} from '~/lib/data';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200 py-2 px-4 overflow-hidden">
        <div className="marquee-track">
          <span className="text-gray-700 text-xs font-medium whitespace-nowrap pr-8">
            ✨ FREE Delivery on orders £75+ • Same-day & Next-day Delivery Available • Up to 80% OFF • Trade-in Your Old Device
          </span>
          <span className="text-gray-700 text-xs font-medium whitespace-nowrap pr-8">
            ✨ FREE Delivery on orders £75+ • Same-day & Next-day Delivery Available • Up to 80% OFF • Trade-in Your Old Device
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className="text-gray-900 font-black text-2xl hidden sm:inline">ALVIS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 flex-1 ml-8">
            <Link to="/" className="text-gray-600 hover:text-purple-600 text-sm font-semibold transition">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-purple-600 text-sm font-semibold transition">Products</Link>
            <Link to="/deals" className="text-gray-600 hover:text-purple-600 text-sm font-semibold transition">Deals</Link>
            <Link to="/about" className="text-gray-600 hover:text-purple-600 text-sm font-semibold transition">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 text-sm font-semibold transition">Contact</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-gray-900 text-sm placeholder-gray-500 outline-none flex-1"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="text-gray-600 hover:text-purple-600 transition text-lg">
              ❤️
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-purple-600 transition relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-purple-600 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 bg-white py-4 px-4 space-y-2">
            <Link to="/" className="block text-gray-600 hover:text-purple-600 py-2">Home</Link>
            <Link to="/products" className="block text-gray-600 hover:text-purple-600 py-2">Products</Link>
            <Link to="/deals" className="block text-gray-600 hover:text-purple-600 py-2">Deals</Link>
            <Link to="/about" className="block text-gray-600 hover:text-purple-600 py-2">About</Link>
            <Link to="/contact" className="block text-gray-600 hover:text-purple-600 py-2">Contact</Link>
          </nav>
        )}
      </header>
    </>
  );
}
