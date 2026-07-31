import { memo, useCallback } from 'react';
import { FaFilter, FaSort, FaTimes } from 'react-icons/fa';

const FilterSection = memo(({ filters, categories, onFilterChange, onReset }) => {
  const handleCategoryChange = useCallback((e) => {
    onFilterChange({ category: e.target.value });
  }, [onFilterChange]);

  const handleSortChange = useCallback((e) => {
    onFilterChange({ sortBy: e.target.value });
  }, [onFilterChange]);

  return (
    <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-highlight" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        {/* Category Filter */}
        <div className="flex-1 min-w-[150px]">
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="select-field text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-400" />
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="select-field text-sm min-w-[140px]"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating-high">Rating: High to Low</option>
            <option value="rating-low">Rating: Low to High</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white 
                   bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FaTimes />
          Reset
        </button>
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

export default FilterSection;