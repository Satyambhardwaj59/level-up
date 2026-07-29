import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = memo(({ currentPage, totalPages, onPageChange, isLoading = false }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1 || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm 
                 border border-gray-700 rounded-lg hover:border-highlight/50 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                 hover:shadow-lg hover:shadow-highlight/10"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        <span className="px-4 py-2 bg-highlight/20 backdrop-blur-sm border border-highlight/30 
                       rounded-lg font-semibold min-w-[60px] text-center">
          {currentPage}
        </span>
        <span className="text-gray-400">of</span>
        <span className="px-4 py-2 bg-secondary/50 backdrop-blur-sm border border-gray-700 
                       rounded-lg min-w-[60px] text-center">
          {totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm 
                 border border-gray-700 rounded-lg hover:border-highlight/50 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                 hover:shadow-lg hover:shadow-highlight/10"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;