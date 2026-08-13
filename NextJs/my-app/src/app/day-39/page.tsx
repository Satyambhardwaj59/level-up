import Link from "next/link";
import ProductApiList from "@/components/day-39/products/ProductApiList";

export default function Day39Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600">
          Day 39
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Full-Stack Product Store
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Today we upgraded our Next.js Product Store
          into a small full-stack application using
          Route Handlers, REST APIs, Server Actions,
          validation, and CRUD operations.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            REST API
          </h2>

          <p className="mt-3 text-gray-600">
            Build GET, POST, PUT and DELETE APIs
            using Next.js Route Handlers.
          </p>

          <Link
            href="/api/products"
            target="_blank"
            className="mt-5 inline-block text-blue-600 underline"
          >
            View Products API
          </Link>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            CRUD Operations
          </h2>

          <p className="mt-3 text-gray-600">
            Create, read, update and delete products
            through the API.
          </p>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Server Actions
          </h2>

          <p className="mt-3 text-gray-600">
            Submit the product form directly to the
            server using Server Actions.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/day-39/products/create"
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Create Product
        </Link>

        <Link
          href="/day-38/products"
          className="rounded-lg border px-6 py-3 transition hover:bg-gray-100"
        >
          View Product Store
        </Link>
      </div>

      <ProductApiList />
    </main>
  );
}