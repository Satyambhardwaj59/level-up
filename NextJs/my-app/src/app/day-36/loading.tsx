// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}