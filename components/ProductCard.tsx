'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/index';

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f8f8f8]">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20" />
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1">
            {product.category}
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm text-gray-900">{product.title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">₹{product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">₹{Math.round(product.price * 1.25)}</span>
                <span className="text-sm text-[#50e3c2]">(25% OFF)</span>
              </>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 z-10"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-6 h-6 ${
            isWishlisted ? 'fill-red-500 stroke-red-500 ' : 'stroke-black'
          }`}
        />
      </button>
    </div>
  );
}

