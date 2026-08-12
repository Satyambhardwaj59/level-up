import Link from "next/link";

export default function Day38Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
        Day 38 • Server & Client Components
      </span>

      <h1 className="mt-6 text-5xl font-bold">
        Next.js Product Store
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        A realistic product store demonstrating
        Server Components, Client Components,
        server-side data fetching and interactive UI.
      </p>

      <Link
        href="/day-38/products"
        className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        Browse Products
      </Link>
    </main>
  );
}