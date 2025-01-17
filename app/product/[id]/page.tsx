import Image from 'next/image';
import { Product } from '@/types/index';
import { AddToCartButton, WishlistButton } from '../../../components/ProductButtons';

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  return data.products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 pt-8 md:pt-20">
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
              <span className="text-lg text-gray-500 line-through">
                ₹{(product.price / 0.75).toFixed(2)} 
              </span>
              <span className="ml-2 text-sm text-[#50e3c2]">(25% OFF)</span>
            </div>

            <div className="mt-8">
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
    </div>
  );
}
