import {Star, Heart} from 'lucide-react';
import {Link} from '@remix-run/react';
import {isWishlisted, toggleWishlist, formatPrice, type Product} from '~/lib/data';
import {AddToCartButton} from './AddToCartButton';
import {useState} from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(isWishlisted(product.id));

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(toggleWishlist(product.id));
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <a className="product-card bg-white rounded-xl overflow-hidden group cursor-pointer border border-gray-200">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.featured && <span className="badge-hot">HOT</span>}
            {product.isNew && <span className="badge-hot">NEW</span>}
            {discount > 0 && <span className="badge-sale">{discount}% OFF</span>}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-md"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating} ({product.reviewCount})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-gray-900 font-bold text-sm mb-3 line-clamp-2 group-hover:text-purple-600 transition">{product.name}</h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-gray-900 font-black text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="text-gray-400 line-through text-xs">{formatPrice(product.originalPrice)}</span>}
          </div>

          {/* Add to Cart Button — Shopify Hydrogen native */}
          <AddToCartButton product={product} quantity={1} />
        </div>
      </a>
    </Link>
  );
}
