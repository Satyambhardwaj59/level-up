import { memo } from 'react';

const FilterButtons = memo(({ currentFilter, onFilterChange, isLoading = false }) => {
  const filters = [
    { value: '', label: 'All' },
    { value: 'movie', label: '🎬 Movies' },
    { value: 'series', label: '📺 Series' },
    { value: 'episode', label: '📼 Episodes' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                   ${currentFilter === filter.value
                     ? 'bg-gradient-to-r from-highlight to-pink-500 text-white shadow-lg shadow-highlight/20'
                     : 'bg-secondary/50 backdrop-blur-sm border border-gray-700 hover:border-highlight/50 text-gray-300 hover:text-white'
                   } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;