import Link from "next/link";

export default function Day37NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-bold">
        404
      </p>

      <h1 className="mt-4 text-3xl font-bold">
        Page Not Found
      </h1>

      <p className="mt-3 text-gray-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        href="/day-37"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Back to Day 37
      </Link>
    </div>
  );
}