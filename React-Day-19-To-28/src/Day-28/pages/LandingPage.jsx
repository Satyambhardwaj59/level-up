import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';

const LandingPage = () => {
  const {
    products,
    loading,
    error,
    categories,
    filters,
    totalProducts,
    hasProducts,
    loadProducts,
    loadProductsByCategory,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handleResetFilters,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle search
  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  const handleCategoryFilter = useCallback(
    (category) => {
      if (category === 'all') {
        loadProducts();
      } else {
        loadProductsByCategory(category);
      }
      handleCategoryChange(category);
    },
    [loadProducts, loadProductsByCategory, handleCategoryChange]
  );

  return (
    <>
      <Helmet>
        <title>ShopVerse - Premium E-Commerce Store</title>
        <meta name="description" content="Discover amazing products at ShopVerse" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />

        <main className="flex-grow container-custom py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-highlight via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Welcome to ShopVerse
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Discover premium products with unbeatable prices. Shop the best deals today!
            </p>
          </div>

          {/* Search */}
          <div className="flex justify-center mb-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search products by name, description, or category..."
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <FilterSection
              filters={filters}
              categories={categories}
              onCategoryChange={handleCategoryFilter}
              onSortChange={handleSortChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {products.length} of {totalProducts} products
            </div>
          )}

          {/* Products Grid */}
          <ErrorBoundary>
            {loading ? (
              <SkeletonLoader count={8} />
            ) : !hasProducts ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button onClick={handleResetFilters} className="mt-4 btn-primary">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;