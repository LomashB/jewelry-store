'use client';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/index';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}

export function WishlistButton({ product }: { product: Product }) {
  const { toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  return (
    <button
      onClick={() => toggleWishlist(product)}
      className="w-full mt-4 border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50"
    >
      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
}