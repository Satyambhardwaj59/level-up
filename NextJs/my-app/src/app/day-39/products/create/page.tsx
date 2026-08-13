import CreateProductForm from "@/components/day-39/products/CreateProductForm";

export default function CreateProductPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600">
          Day 39
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Create Product
        </h1>

        <p className="mt-3 text-gray-600">
          Add a new product to your store.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <CreateProductForm />
      </div>
    </main>
  );
}