import React, { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorBoundary from '../components/ErrorBoundary';
import InfiniteScroll from '../components/InfiniteScroll';
import Footer from '../components/Footer';
import CartSummary from '../components/CartSummary';

// Lazy load Product Details
const ProductDetails = lazy(() => import('./ProductDetails'));

const LandingPage = () => {
  const {
    products,
    loading,
    error,
    categories,
    filters,
    totalProducts,
    hasProducts,
    updateFilters,
    resetFilters,
    fetchProducts,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  // Update search filter
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    updateFilters({ search: value });
    setVisibleProducts(8);
  }, [updateFilters]);

  // Load more products
  const loadMore = useCallback(() => {
    setVisibleProducts(prev => {
      const newCount = prev + 8;
      if (newCount >= products.length) {
        setHasMore(false);
        return products.length;
      }
      return newCount;
    });
  }, [products.length]);

  // Reset hasMore when products change
  useMemo(() => {
    setHasMore(products.length > visibleProducts);
  }, [products.length, visibleProducts]);

  // Get current visible products
  const currentProducts = useMemo(() => {
    return products.slice(0, visibleProducts);
  }, [products, visibleProducts]);

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="container-custom py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Products</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button onClick={fetchProducts} className="btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold pb-2 mb-4 bg-gradient-to-r from-highlight via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Product Catalog
          </h1>
          <p className="text-gray-400 text-lg">
            Discover amazing products with performance optimization
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <SearchBar 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products by name, description, or category..."
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <FilterSection
            filters={filters}
            categories={categories}
            onFilterChange={updateFilters}
            onReset={resetFilters}
          />
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-400">
            Showing {currentProducts.length} of {totalProducts} products
          </div>
        )}

        {/* Products Grid */}
        <ErrorBoundary onRetry={fetchProducts}>
          {loading && !products.length ? (
            <SkeletonLoader count={8} />
          ) : !hasProducts ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Products Found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasMore}
              loadMore={loadMore}
              loading={loading}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </ErrorBoundary>
      </div>
      <CartSummary />
       <Footer />
    </div>
  );
};

export default LandingPage;