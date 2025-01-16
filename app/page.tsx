import Features from '@/components/Features';
import ProductCard from "@/components/ProductCard";
import ShopByCategory from '@/components/shopByCategory';
import { Product } from "@/types";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <div className="w-full bg-[#DDF2EF] text-black text-center py-2 text-sm">
        Silver Love Sale: Flat 25% Off on Everything. T&CA.
      </div>
      
      <div className="max-w-7xl mx-auto px-4 bg-white">
        <div className="py-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Exploring Brass</h1>
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button className="border border-black text-black px-4 py-2">SORT BY</button>
              <select className=" px-4 py-2 border border-black text-black">
                <option>Popular</option>
              </select>
              <button className="border border-black text-black px-4 py-2 flex items-center gap-2">
                FILTER
              </button>
            </div>
            <span>29 Designs</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Features />
      <ShopByCategory />
    </main>
  );
}

