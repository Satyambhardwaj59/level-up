// app/categories/page.tsx
import { getCategories, getProductsByCategory } from '@/lib/day-36/products';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | Product Store',
  description: 'Browse products by category',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/day-36/products?category=${category}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center"
          >
            <h2 className="text-xl font-semibold capitalize">{category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}