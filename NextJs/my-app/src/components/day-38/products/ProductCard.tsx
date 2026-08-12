import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/day-38";

import AddToCart from "./AddToCart";
import FavoriteButton from "../common/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6"
        />

        <div className="absolute right-3 top-3">
          <FavoriteButton productId={product.id} />
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mt-2 line-clamp-2 font-semibold">
          {product.title}
        </h2>

        <p className="mt-3 text-xl font-bold">
          ${product.price}
        </p>

        <Link
          href={`/day-38/products/${product.id}`}
          className="mt-4 block text-sm underline"
        >
          View Details
        </Link>

        <div className="mt-4">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}