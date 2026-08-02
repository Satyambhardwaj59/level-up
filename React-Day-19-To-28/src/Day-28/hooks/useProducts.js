import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo, useEffect } from 'react';
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  setSearch,
  setCategory,
  setSortBy,
  resetFilters,
  applyFilters,
  clearSelectedProduct,
} from '../store/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const {
    items,
    filteredItems,
    selectedProduct,
    categories,
    loading,
    error,
    filters,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const loadProduct = useCallback((id) => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  const loadProductsByCategory = useCallback((category) => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch]);

  const handleSearch = useCallback((value) => {
    dispatch(setSearch(value));
    dispatch(applyFilters());
  }, [dispatch]);

  const handleCategoryChange = useCallback((value) => {
    dispatch(setCategory(value));
    dispatch(applyFilters());
  }, [dispatch]);

  const handleSortChange = useCallback((value) => {
    dispatch(setSortBy(value));
    dispatch(applyFilters());
  }, [dispatch]);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    dispatch(applyFilters());
  }, [dispatch]);

  const clearProduct = useCallback(() => {
    dispatch(clearSelectedProduct());
  }, [dispatch]);

  // Memoized values
  const totalProducts = useMemo(() => filteredItems.length, [filteredItems]);
  const hasProducts = useMemo(() => filteredItems.length > 0, [filteredItems]);

  return {
    products: filteredItems,
    allProducts: items,
    selectedProduct,
    categories,
    loading,
    error,
    filters,
    totalProducts,
    hasProducts,
    loadProducts,
    loadProduct,
    loadProductsByCategory,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handleResetFilters,
    clearProduct,
  };
};