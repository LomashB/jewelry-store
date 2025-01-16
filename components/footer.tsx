import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">About Us</h3>
            <p className="text-sm text-gray-600">Discover the finest fashion jewelry at SHAYA.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-gray-600 hover:text-gray-900">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
            <p className="text-sm text-gray-600">Email: support@shaya.com</p>
            <p className="text-sm text-gray-600">Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">&copy; 2023 SHAYA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}