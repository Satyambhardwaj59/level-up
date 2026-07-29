import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialQuery = '', isLoading = false }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  }, [query, isLoading, onSearch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (query.trim() && !isLoading) {
        onSearch(query.trim());
      }
    }
  }, [query, isLoading, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-highlight transition-colors" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies, series, episodes..."
          className="w-full pl-12 pr-12 py-3 bg-secondary/50 backdrop-blur-sm border border-gray-700 rounded-xl 
                   focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 
                   text-white placeholder-gray-400 transition-all duration-300"
          disabled={isLoading}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-14 pr-2 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute inset-y-0 right-0 px-4 bg-gradient-to-r from-highlight to-pink-500 
                   rounded-r-xl text-white font-medium hover:opacity-90 transition-opacity
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;