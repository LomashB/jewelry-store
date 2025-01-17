'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import { Product } from '@/types/index';
import { AddToCartButton, WishlistButton } from '../../../components/ProductButtons';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`, {
          next: { revalidate: 60 },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 pt-12">
      <div className="lg:col-span-1">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="rounded-lg"
        />
      </div>

      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <div className="mt-4">
          <p className="text-2xl font-medium text-gray-900">₹{product.price}</p>
          {product.discountPercentage > 0 && (
            <div>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price}
            </span>
            <span className="text-sm text-[#50e3c2] ml-2 ">
            20% OFF
          </span>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4">
          <AddToCartButton product={product} />
          <WishlistButton product={product} />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Description</h3>
          <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  </div>

  );
}