import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

async function getProductsByCategory(category: string) {
  // Category mapping
  const categoryMapping: { [key: string]: string } = {
    earrings: "beauty",
    necklaces: "fragrances",
    bracelets: "furniture",
    rings: "groceries",
    "more-styles": "beauty",
    stories: "groceries",
    gifts: "furniture",
  };

  // Use mapped category or fallback to original category
  const apiCategory = categoryMapping[category] || category;
  const res = await fetch(
    `https://dummyjson.com/products/category/${apiCategory}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

export async function generateStaticParams() {
    const categories = ['earrings', 'necklaces', 'bracelets', 'rings', 'more-styles', 'stories', 'gifts'];
    return categories.map((category) => ({
        category: category,
    }));
}


type Props = {
    params: {
        category: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  try {
    const products = await getProductsByCategory(params.category);
    const formattedCategory = params.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-baseline border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {formattedCategory}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {products.length} results
              </p>
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
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg h-40 text-gray-500">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
