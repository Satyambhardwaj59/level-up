import { getProducts } from "@/lib/day-38/products";
import ProductList from "@/components/day-38/products/ProductList";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <p className="mt-2 text-gray-600">
          Explore our latest products.
        </p>
      </div>

      <ProductList products={products} />
    </main>
  );
}