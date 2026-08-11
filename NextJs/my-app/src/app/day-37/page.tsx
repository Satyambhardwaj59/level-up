import Link from "next/link";

export default function Day37HomePage() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6">
      <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        Day 37 • Next.js Routing
      </span>

      <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight">
        Next.js Developer Portfolio
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        A portfolio and blog application demonstrating
        Next.js App Router routing concepts with
        TypeScript.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/day-37/projects"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          View Projects
        </Link>

        <Link
          href="/day-37/blog"
          className="rounded-lg border px-6 py-3"
        >
          Read Blog
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "Static Routes",
          "Dynamic Routes",
          "Query Parameters",
          "Catch-All Routes",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border p-5"
          >
            <p className="font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}