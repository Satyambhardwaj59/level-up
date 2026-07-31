import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-highlight/20 rounded-full animate-spin-slow">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-highlight rounded-full animate-spin-slow border-t-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-r from-highlight to-pink-500 rounded-full animate-pulse-slow"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-400 animate-pulse-slow">Loading products...</p>
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;