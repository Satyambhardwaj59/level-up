import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { productApi } from '../services/productApi';
import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Render stars
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

  if (loading) return <Loader />;
  if (error) return (
    <div className="container-custom py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Product</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button onClick={fetchProduct} className="btn-primary">Retry</button>
      </div>
    </div>
  );
  if (!product) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary">
        <div className="container-custom py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <FaArrowLeft />
            Back to Catalog
          </button>

          {/* Product Details */}
          <div className="bg-secondary/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-800/30 rounded-xl p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[400px] object-contain"
                />
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-highlight/20 text-highlight rounded-full text-sm font-semibold mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating?.rate || 0)}
                    </div>
                    <span className="text-gray-400">
                      ({product.rating?.count || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-4xl font-bold text-highlight">
                  ${product.price.toFixed(2)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
                  <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-3">
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <Link to="/" className="flex-1">
                    <button className="w-full btn-secondary py-3">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
         <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetails;