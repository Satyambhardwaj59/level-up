import { Product } from "@/types/day-38";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({
  products,
}: ProductListProps) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <ProductSearch />

        <ProductFilter products={products} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}