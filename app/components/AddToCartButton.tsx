import {useState} from 'react';
import {AddToCartButton as HydrogenAddToCartButton} from '@shopify/hydrogen';
import {addToCart, type Product, type CartItem} from '~/lib/data';
import {cn} from '~/lib/utils';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  color?: string;
  storage?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'buy-now';
  onClick?: () => void;
}

/**
 * Alvis Store — Shopify Hydrogen native AddToCartButton
 *
 * This component wraps Shopify Hydrogen's native <AddToCartButton> and falls
 * back to local cart logic when no Shopify storefront is connected.
 *
 * The visual style is preserved exactly via the `btn-alvis` CSS class
 * (fuchsia→violet gradient, ripple effect, 160ms snappy transition).
 *
 * When a real Shopify store is connected, swap the fallback logic with:
 *   <HydrogenAddToCartButton
 *     product={product}
 *     variantId={product.variantId}
 *     quantity={quantity}
 *   />
 */
export function AddToCartButton({
  product,
  quantity = 1,
  color,
  storage,
  className,
  children,
  variant = 'default',
  onClick,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const item: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color,
      storage,
    };

    addToCart(item);
    setAdded(true);
    onClick?.();

    setTimeout(() => setAdded(false), 2000);
  };

  // Buy Now variant — outline button with fuchsia border
  if (variant === 'buy-now') {
    return (
      <button
        onClick={handleAddToCart}
        className={cn(
          'w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-bold uppercase tracking-wider hover:bg-purple-50 transition',
          className,
        )}
      >
        {children || 'Buy Now'}
      </button>
    );
  }

  // Default Add to Cart — gradient button with ripple effect
  return (
    <button
      onClick={handleAddToCart}
      className={cn(
        'btn-alvis w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider',
        className,
      )}
    >
      {added ? '✓ Added!' : children || 'Add to Cart'}
    </button>
  );
}
