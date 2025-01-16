import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Bestseller',
    image: '/categories/earrins.png',
    link: '/bestseller',
    isTopPicks: true,
  },
  {
    name: 'Earrings',
    image: '/categories/earrings.png',
    link: '/category/earrings',
  },
  {
    name: 'Necklaces',
    image: '/categories/necklaces.png',
    link: '/category/necklaces',
  },
  {
    name: 'Bracelets',
    image: '/categories/bracelets.png',
    link: '/category/bracelets',
  },
  {
    name: 'Rings',
    image: '/categories/rings.png',
    link: '/category/rings',
  },
  {
    name: 'More Jewellery',
    image: '/categories/morejew.png',
    link: '/more-jewellery',
  },
  {
    name: 'Coins And Articles',
    image: '/categories/coins.png',
    link: '/coins-and-articles',
  },
];

export default function ShopByCategory() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-black">Shop by</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="flex flex-col items-center group"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {category.isTopPicks && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <span className="text-[#50e3c2] text-lg font-bold">Top Picks</span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

