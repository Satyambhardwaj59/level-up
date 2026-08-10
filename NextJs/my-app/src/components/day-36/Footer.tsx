// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Product Store</h3>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for amazing products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/day-36/products" className="text-gray-600 hover:text-blue-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/day-36/categories" className="text-gray-600 hover:text-blue-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/day-36/about" className="text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-gray-600 text-sm">Email: info@productstore.com</p>
            <p className="text-gray-600 text-sm">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t mt-6 pt-6 text-center text-sm text-gray-600">
          &copy; 2026 Product Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}