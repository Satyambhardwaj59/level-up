import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
      <p className="mt-2 text-gray-500">
        The product you are looking for does not exist.
      </p>
      <Link
        href="/day-45/products"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Back to Products
      </Link>
    </div>
  );
}