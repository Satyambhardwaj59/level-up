import { memo, useCallback } from 'react';
import { FaFilter, FaSort, FaTimes } from 'react-icons/fa';

const FilterSection = memo(({
  filters,
  categories,
  onCategoryChange,
  onSortChange,
  onReset,
}) => {
  const handleCategoryChange = useCallback((e) => {
    onCategoryChange(e.target.value);
  }, [onCategoryChange]);

  const handleSortChange = useCallback((e) => {
    onSortChange(e.target.value);
  }, [onSortChange]);

  return (
    <div className="bg-white dark:bg-secondary-dark rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-highlight" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
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
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
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