'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingCart, Heart, User, Settings } from 'lucide-react';

export default function Navbar() {
  const { cart, wishlist } = useCart();

  return (
    <>
      <div className="w-full bg-[#DDF2EF] text-black text-center py-2 text-sm">
        Shaya by CaratLane | Crafted in 925 Silver
      </div>
      <nav className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">
              <img src="/logo.svg" alt="SHAYA" />
            </Link>
            
            <div className="hidden md:flex space-x-8 text-sm">
              <Link href="/category/earrings" className="hover:text-accent">EARRINGS</Link>
              <Link href="/category/necklaces" className="hover:text-accent">NECKLACES</Link>
              <Link href="/category/bracelets" className="hover:text-accent">BRACELETS</Link>
              <Link href="/category/rings" className="hover:text-accent">RINGS</Link>
              <Link href="/category/more-styles" className="hover:text-accent">MORE STYLES</Link>
              <Link href="/category/stories" className="hover:text-accent">STORIES</Link>
              <Link href="/category/gifts" className="hover:text-accent">GIFTS</Link>
            </div>

            <div className="flex items-center space-x-6">
              <button className="hover:text-accent">
                <User className="w-5 h-5" />
              </button>
              <button className="hover:text-accent">
                <Settings className="w-5 h-5" />
              </button>
              <button className="hover:text-accent">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/wishlist" className="relative hover:text-accent">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#7FFFD4] text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative hover:text-accent">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#7FFFD4] text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

