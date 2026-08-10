// app/products/page.tsx
import { getProducts } from '@/lib/day-36/products';
import ProductCard from '@/components/day-36/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Product Store',
  description: 'Browse our collection of products',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}