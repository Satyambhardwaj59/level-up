interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocsPage({
  params,
}: DocsPageProps) {
  const { slug } = await params;

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        Documentation
      </h1>

      <div className="mt-8 rounded-xl bg-gray-100 p-6">
        <p className="text-sm text-gray-500">
          Current Documentation Path
        </p>

        <p className="mt-3 font-mono text-lg">
          /docs/{slug.join("/")}
        </p>
      </div>
    </section>
  );
}