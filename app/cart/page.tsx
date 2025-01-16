'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <Image src={item.thumbnail || "/placeholder.svg"} alt={item.title} width={100} height={100} className="rounded-md" />
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => removeFromCart(item.id)} className="p-1 rounded-full hover:bg-gray-100">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="p-1 rounded-full hover:bg-gray-100">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl">₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}