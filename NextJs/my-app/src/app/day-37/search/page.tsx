"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    router.push(
      `/day-37/search?q=${encodeURIComponent(value)}`
    );
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        Search Blog
      </h1>

      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search articles..."
        className="mt-8 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
      />

      <div className="mt-6 rounded-lg bg-gray-100 p-5">
        <p>
          Search Query:
          <strong className="ml-2">
            {query || "No search query"}
          </strong>
        </p>
      </div>
    </section>
  );
}