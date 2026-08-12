"use client";

import { useState } from "react";

import { Product } from "@/types/day-38";
import Toast from "../common/Toast";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({
  product,
}: AddToCartProps) {
  const [showToast, setShowToast] =
    useState(false);

  const handleAddToCart = () => {
    console.log("Added to cart:", product);

    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-gray-800"
      >
        Add to Cart
      </button>

      <Toast
        message={`${product.title} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}