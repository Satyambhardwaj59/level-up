import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaCheck,
} from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loading, error, loadProduct, clearProduct } = useProducts();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct(id);
    return () => clearProduct();
  }, [id, loadProduct, clearProduct]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400 text-xl" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400 text-xl" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="text-gray-400 text-xl" />);
    }

    return stars;
  };

  const handleAddToCart = useCallback(() => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          image: selectedProduct.image,
        });
      }
    }
  }, [selectedProduct, quantity, addItem]);

  const handleToggleWishlist = useCallback(() => {
    if (selectedProduct) {
      toggleItem({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        category: selectedProduct.category,
      });
    }
  }, [selectedProduct, toggleItem]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />
        <div className="flex-grow container-custom py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
            <p className="text-gray-400 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const inCart = isInCart(selectedProduct.id);
  const inWishlist = isInWishlist(selectedProduct.id);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{selectedProduct.title} - ShopVerse</title>
        <meta name="description" content={selectedProduct.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />

        <main className="flex-grow container-custom py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors mb-6"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* Product Details */}
          <div className="bg-white dark:bg-secondary-dark rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-h-[400px] object-contain"
                />
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-highlight/20 text-highlight rounded-full text-sm font-semibold mb-3">
                    {selectedProduct.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {selectedProduct.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      {renderStars(selectedProduct.rating?.rate || 0)}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({selectedProduct.rating?.count || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-4xl font-bold text-highlight">
                  ${selectedProduct.price.toFixed(2)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-gray-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    {inCart ? <FaCheck /> : <FaShoppingCart />}
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      inWishlist
                        ? 'bg-highlight/20 text-highlight hover:bg-highlight/30'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <FaHeart className={inWishlist ? 'fill-highlight' : ''} />
                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Category</span>
                    <p className="font-medium text-gray-800 dark:text-white capitalize">
                      {selectedProduct.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Rating</span>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {selectedProduct.rating?.rate || 0} / 5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetails;