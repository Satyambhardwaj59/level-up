"use client";

import { useState } from "react";

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({
  productId,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);

    console.log(
      "Favorite product:",
      productId
    );
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label="Add to favorites"
      className="rounded-full bg-white p-2 shadow"
    >
      {favorite ? "❤️" : "♡"}
    </button>
  );
}