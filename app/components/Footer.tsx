import {Link} from '@remix-run/react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=Phones" className="text-gray-400 hover:text-white transition">Phones</Link></li>
              <li><Link to="/products?category=Laptops" className="text-gray-400 hover:text-white transition">Laptops</Link></li>
              <li><Link to="/products?category=Audio" className="text-gray-400 hover:text-white transition">Audio</Link></li>
              <li><Link to="/products?category=Gaming" className="text-gray-400 hover:text-white transition">Gaming</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Alvis Electronics. All rights reserved.</p>
          <div className="flex gap-4">
            <img src="/images/visa.svg" alt="Visa" className="h-6 opacity-60" />
            <img src="/images/mastercard.svg" alt="MC" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
