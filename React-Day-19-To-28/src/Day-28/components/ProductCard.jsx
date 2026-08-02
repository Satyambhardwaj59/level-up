import { memo, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaCheck,
} from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import toast from 'react-hot-toast';

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { id, title, price, image, rating, category } = product;

  const inCart = isInCart(id);
  const inWishlist = isInWishlist(id);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        toast.error('Please login to add items to cart');
        navigate('/login');
        return;
      }
      
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
    },
    [dispatch, product, isAuthenticated, navigate]
  );

  const handleToggleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        toast.error('Please login to add items to wishlist');
        navigate('/login');
        return;
      }
      
      toggleItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    },
    [toggleItem, product, isAuthenticated, navigate]
  );

  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="bg-white dark:bg-secondary-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
          )}
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-contain p-4 transition-all duration-500 hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-highlight/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
              {category}
            </span>
          </div>
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 left-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300"
            aria-label="Toggle wishlist"
          >
            <FaHeart
              className={`text-xl ${
                inWishlist ? 'text-highlight fill-highlight' : 'text-gray-400'
              }`}
            />
          </button>
          {inCart && isAuthenticated && (
            <div className="absolute bottom-2 right-2">
              <span className="px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1 text-white">
                <FaCheck />
                In Cart
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-highlight transition-colors text-gray-800 dark:text-white">
            {title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">{renderStars(rating?.rate || 0)}</div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({rating?.count || 0})
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-highlight">${price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                inCart && isAuthenticated
                  ? 'bg-green-500/20 hover:bg-green-500/30 dark:bg-green-500/20 dark:hover:bg-green-500/30'
                  : 'bg-highlight/20 hover:bg-highlight/30 dark:bg-highlight/20 dark:hover:bg-highlight/30'
              }`}
            >
              {inCart && isAuthenticated ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaShoppingCart className="text-highlight" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;