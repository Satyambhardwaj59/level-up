import Image from "next/image";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/day-38/products";
import AddToCart from "@/components/day-38/products/AddToCart";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative h-[500px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <p className="text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            {product.title}
          </h1>

          <p className="mt-6 text-3xl font-bold">
            ${product.price}
          </p>

          <p className="mt-6 leading-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-4">
            ⭐ {product.rating.rate} (
            {product.rating.count} reviews)
          </p>

          <div className="mt-8 max-w-sm">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}