import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Pagination from '../components/Pagination';
import FilterButtons from '../components/FilterButtons';
import SkeletonLoader from '../components/SkeletonLoader';
import { useMovies } from '../hooks/useMovies';

const LandingPage = () => {
  const navigate = useNavigate();
  const {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    type,
    query,
    setQuery,
    setType,
    fetchMovies,
    debouncedSearch,
    hasResults,
  } = useMovies('');

  const [searchQuery, setSearchQuery] = useState('');

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery, 1, type);
    } else {
      fetchMovies('', 1, type);
    }
  }, [searchQuery, type, debouncedSearch, fetchMovies]);

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
    setQuery(value);
  }, [setQuery]);

  const handleFilterChange = useCallback((newType) => {
    setType(newType);
    if (searchQuery) {
      fetchMovies(searchQuery, 1, newType);
    }
  }, [searchQuery, fetchMovies, setType]);

  const handlePageChange = useCallback((page) => {
    if (searchQuery) {
      fetchMovies(searchQuery, page, type);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery, fetchMovies, type]);

  const handleRetry = useCallback(() => {
    if (searchQuery) {
      fetchMovies(searchQuery, currentPage, type);
    }
  }, [searchQuery, currentPage, type, fetchMovies]);

  // Memoized movie cards
  const movieCards = useMemo(() => {
    return movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ));
  }, [movies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary">
      <div className="container-custom py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-highlight via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Discover Amazing Movies
          </h1>
          <p className="text-gray-400 text-lg">
            Search and explore your favorite films, series, and episodes
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            initialQuery={query}
            isLoading={loading}
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterButtons 
            currentFilter={type}
            onFilterChange={handleFilterChange}
            isLoading={loading}
          />
        </div>

        {/* Results Section */}
        <div className="mt-8">
          {loading ? (
            <SkeletonLoader count={10} />
          ) : error ? (
            <Error message={error} onRetry={handleRetry} />
          ) : !hasResults && searchQuery ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Movies Found</h3>
              <p className="text-gray-400">
                We couldn't find any movies matching "{searchQuery}"
              </p>
              <button
                onClick={() => handleSearch('')}
                className="mt-4 px-6 py-2 bg-highlight/20 hover:bg-highlight/30 text-highlight rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : !hasResults && !searchQuery ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">Start Your Search</h3>
              <p className="text-gray-400">
                Enter a movie title above to discover amazing films
              </p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6 text-gray-400 text-sm">
                Showing {movies.length} results
              </div>

              {/* Movie Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {movieCards}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={loading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;