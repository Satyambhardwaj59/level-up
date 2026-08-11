import { blogs } from "@/data/day-37/blogs";
import { notFound } from "next/navigation";

interface BlogDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsProps) {
  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <span className="text-sm text-gray-500">
        Blog Article
      </span>

      <h1 className="mt-3 text-4xl font-bold">
        {blog.title}
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        {blog.description}
      </p>

      <div className="mt-10 border-t pt-10">
        <p className="leading-8">
          {blog.content}
        </p>
      </div>
    </article>
  );
}