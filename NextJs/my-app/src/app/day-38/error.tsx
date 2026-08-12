"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function ErrorPage({
  reset,
}: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-3 text-gray-600">
        We couldn't load the products.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Try Again
      </button>
    </div>
  );
}