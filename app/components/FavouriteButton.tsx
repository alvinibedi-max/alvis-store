import React, {useState} from 'react';
import {Heart} from 'lucide-react';
import {cn} from '~/lib/utils';

export default function FavouriteButton({
  product,
  productId,
  className = '',
}: {
  product?: {id: string; name: string; image_url: string; price: number};
  productId?: string;
  className?: string;
}) {
  const id = productId || product?.id;
  if (!id) return null;

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('alvis_wishlist') || '[]');
    } catch {
      return [];
    }
  });

  const isFav = wishlist.includes(id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (isFav) {
      updated = wishlist.filter(i => i !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem('alvis_wishlist', JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'rounded-full transition-all duration-300 p-1',
        isFav ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-black',
        className,
      )}
    >
      <Heart className={cn('w-5 h-5 transition-all', isFav ? 'fill-red-500 scale-110' : '')} />
    </button>
  );
}
