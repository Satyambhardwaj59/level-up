import Link from 'next/link';
import { getProducts } from '@/lib/day-36/products';
import ProductCard from '@/components/day-36/ProductCard';

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Product Store
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Discover amazing products at great prices
        </p>
        <Link
          href="/day-36/products"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/day-36/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}