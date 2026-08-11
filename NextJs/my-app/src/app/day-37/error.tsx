"use client";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong!
      </h1>

      <p className="mt-3 text-gray-600">
        An unexpected error occurred.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Try Again
      </button>
    </div>
  );
}