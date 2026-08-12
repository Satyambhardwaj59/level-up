"use client";

import Image from "next/image";
import QuantityControl from "./QuantityControl";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export default function CartItem({
  item,
}: CartItemProps) {
  return (
    <div className="flex gap-5 rounded-xl border p-5">
      {/* Image */}
      <div className="relative h-28 w-28 shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="font-semibold">
            {item.title}
          </h2>

          <p className="mt-2 font-bold">
            ${item.price}
          </p>
        </div>

        <QuantityControl
          quantity={item.quantity}
        />
      </div>
    </div>
  );
}