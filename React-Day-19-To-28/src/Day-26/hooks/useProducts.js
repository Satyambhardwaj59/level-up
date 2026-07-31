import { useState, useEffect, useCallback, useMemo } from 'react';
import { productApi } from '../services/productApi';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'default',
  });

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await productApi.getCategories();
      setCategories(['all', ...data]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // Apply filters and sorting
  const applyFilters = useCallback(() => {
    let result = [...products];

    // Search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(product =>
        product.category === filters.category
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      default:
        // Default sorting by ID or title
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  // Memoized values
  const totalProducts = useMemo(() => filteredProducts.length, [filteredProducts]);
  const hasProducts = useMemo(() => filteredProducts.length > 0, [filteredProducts]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      sortBy: 'default',
    });
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Apply filters when products or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    categories,
    filters,
    totalProducts,
    hasProducts,
    updateFilters,
    resetFilters,
    fetchProducts,
    fetchCategories,
  };
};