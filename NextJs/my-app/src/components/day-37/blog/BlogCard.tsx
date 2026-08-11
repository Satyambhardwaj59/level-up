import Link from "next/link";
import { Blog } from "@/types/day-37";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({
  blog,
}: BlogCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <h2 className="text-xl font-bold">
        {blog.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {blog.description}
      </p>

      <Link
        href={`/day-37/blog/${blog.slug}`}
        className="mt-5 inline-block font-semibold underline"
      >
        Read Article →
      </Link>
    </article>
  );
}