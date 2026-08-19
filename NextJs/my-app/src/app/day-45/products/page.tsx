import { Product } from '@/types/Day-45/product';
import { ProductsCatalog } from '@/components/day-45/product/ProductsCatalog';

async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <ProductsCatalog products={products} />;
}