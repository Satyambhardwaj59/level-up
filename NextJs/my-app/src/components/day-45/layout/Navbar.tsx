'use client';

import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { useAppSelector } from '@/hooks/redux';
import { Badge } from '@/components/day-45/ui/Badge';

export function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ProductStore
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/day-45/products"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/day-45/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}