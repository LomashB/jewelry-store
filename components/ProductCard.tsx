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
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-baseline">
            <span className="ml-2 text-md text-black  font-bold">₹{product.price}</span>
            {product.discountPercentage > 0 && (
                <>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{product.price}</span>
                  <span className="ml-2 text-sm text-[#50e3c2]">(25% OFF)</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Heart
          className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
        />
      </button>
    </div>
  );
}

