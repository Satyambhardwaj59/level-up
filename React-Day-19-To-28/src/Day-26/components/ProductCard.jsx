import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import AddToCartNotification from './AddToCartNotification';

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const { id, title, price, image, rating, category } = product;
  
  const cartItem = useSelector((state) => 
    state.cart.items.find(item => item.id === id)
  );
  const isInCart = !!cartItem;

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

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
    setShowNotification(true);
  }, [dispatch, product]);

  return (
    <>
      <Link to={`/product/${id}`} className="block h-full">
        <div className="card card-hover h-full flex flex-col animate-fade-in">
          <div className="relative aspect-square overflow-hidden bg-gray-800">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-highlight/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                {category}
              </span>
            </div>
            {isInCart && (
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaCheck className="text-white" />
                  In Cart
                </span>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-highlight transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {renderStars(rating?.rate || 0)}
              </div>
              <span className="text-xs text-gray-400">
                ({rating?.count || 0})
              </span>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800">
              <span className="text-xl font-bold text-highlight">
                ${price.toFixed(2)}
              </span>
              <button 
                onClick={handleAddToCart}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isInCart 
                    ? 'bg-green-500/20 hover:bg-green-500/30' 
                    : 'bg-highlight/20 hover:bg-highlight/30'
                }`}
              >
                {isInCart ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaShoppingCart className="text-highlight" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showNotification && (
        <AddToCartNotification
          product={product}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;