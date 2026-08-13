import Image from "next/image";

import { Product } from "@/types/day-39";

interface ProductApiResponse {
  success: boolean;
  count: number;
  data: Product[];
}

async function getProducts(): Promise<ProductApiResponse> {
  const response = await fetch(
    "http://localhost:3000/api/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductApiList() {
  const result = await getProducts();

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Products from API
        </h2>

        <p className="mt-1 text-gray-600">
          Total Products: {result.count}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.data.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            {/* Image */}

            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6"
              />
            </div>

            {/* Content */}

            <div className="p-5">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize">
                {product.category}
              </span>

              <h3 className="mt-4 text-xl font-bold">
                {product.title}
              </h3>

              <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${product.price}
                </span>

                <span className="text-sm text-gray-500">
                  ID: {product.id}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}