"use client";

import { useState } from "react";

interface QuantityControlProps {
  quantity: number;
}

export default function QuantityControl({
  quantity: initialQuantity,
}: QuantityControlProps) {
  const [quantity, setQuantity] =
    useState(initialQuantity);

  const decrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const increase = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border">
      <button
        onClick={decrease}
        className="px-4 py-2 hover:bg-gray-100"
      >
        −
      </button>

      <span className="min-w-10 text-center">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="px-4 py-2 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}