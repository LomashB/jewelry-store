'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/index';
import { AddToCartButton, WishlistButton } from '../../../components/ProductButtons';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${params.id}`, {
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
  }, [params.id]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-64 md:h-96">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.title}
              </h1>
              
              {/* Price Section */}
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-green-600">
                  ₹{product.price}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-500 line-through">
                    ₹{(product.price / 0.75).toFixed(2)}
                  </p>
                  <span className="text-green-600 font-medium text-sm bg-green-50 px-2 py-1 rounded">
                    25% OFF
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <AddToCartButton product={product} />
                <WishlistButton product={product} />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}