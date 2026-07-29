

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-secondary/50 rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-[2/3] bg-gray-700/50"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700/50 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;