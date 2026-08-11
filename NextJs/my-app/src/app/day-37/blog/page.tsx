import BlogCard from "@/components/day-37/blog/BlogCard";
import { blogs } from "@/data/day-37/blogs";
import Link from "next/link";

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Blog
          </h1>

          <p className="mt-3 text-gray-600">
            Articles about web development.
          </p>
        </div>

        <Link
          href="/day-37/search"
          className="rounded-lg border px-4 py-2"
        >
          Search
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.slug}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
}