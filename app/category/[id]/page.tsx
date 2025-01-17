"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

// Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

function getProductsByCategory(category: string): Promise<Product[]> {
  const categoryMapping: { [key: string]: string } = {
    earrings: "beauty",
    necklaces: "fragrances",
    bracelets: "furniture",
    rings: "groceries",
    "more-styles": "beauty",
    stories: "groceries",
    gifts: "furniture",
  };

  const apiCategory = categoryMapping[category] || category;

  return fetch(`https://dummyjson.com/products/category/${apiCategory}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => data.products)
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
}

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProductsByCategory(params.id as string);
        if (fetchedProducts.length === 0) {
          setError("No products found in this category");
        }
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [params.id]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const formattedCategory = (params.id as string)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-baseline border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {formattedCategory}
            </h1>
            <p className="mt-2 text-sm text-gray-500">{products.length} results</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}