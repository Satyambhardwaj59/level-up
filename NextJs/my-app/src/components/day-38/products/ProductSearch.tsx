"use client";

import { useState } from "react";

export default function ProductSearch() {
  const [search, setSearch] = useState("");

  return (
    <input
      type="search"
      value={search}
      onChange={(event) =>
        setSearch(event.target.value)
      }
      placeholder="Search products..."
      className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
    />
  );
}