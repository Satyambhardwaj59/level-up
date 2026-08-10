// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/day-36" className="text-xl font-bold text-blue-600">
            Product Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/day-36/products" className="hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/day-36/categories" className="hover:text-blue-600 transition">
              Categories
            </Link>
            <Link href="/day-36/about" className="hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/day-36/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/day-36/products"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/day-36/categories"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/day-36/about"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/day-36/contact"
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}