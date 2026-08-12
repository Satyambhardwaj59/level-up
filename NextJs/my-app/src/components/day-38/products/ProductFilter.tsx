"use client";

import { Product } from "@/types/day-38";
import { useState } from "react";

interface ProductFilterProps {
  products: Product[];
}

export default function ProductFilter({
  products,
}: ProductFilterProps) {
  const [category, setCategory] =
    useState("all");

  const categories = [
    "all",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  return (
    <select
      value={category}
      onChange={(event) =>
        setCategory(event.target.value)
      }
      className="rounded-lg border px-4 py-3"
    >
      {categories.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}