import { useState, useCallback, useMemo } from 'react';
import { movieApi } from '../services/movieApi';

export const useMovies = (initialQuery = '') => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState('');
  const [query, setQuery] = useState(initialQuery);

  const fetchMovies = useCallback(async (searchQuery, page = 1, movieType = '') => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await movieApi.searchMovies(searchQuery, page, movieType);
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults) || 0);
        setCurrentPage(page);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (searchQuery, page = 1, movieType = '') => {
      const timeoutId = setTimeout(() => {
        fetchMovies(searchQuery, page, movieType);
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [fetchMovies]
  );

  // Memoized values
  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / 10);
  }, [totalResults]);

  const hasResults = useMemo(() => {
    return movies.length > 0;
  }, [movies]);

  return {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    totalPages,
    type,
    query,
    setQuery,
    setType,
    fetchMovies,
    debouncedSearch,
    hasResults,
  };
};