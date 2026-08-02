import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingCart,
  FaCreditCard,
  FaArrowRight,
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { addToCart, removeFromCart, deleteItem, clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartSidebar = memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items, totalQuantity, totalPrice } = useCart();

  const handleIncrease = useCallback(
    (item) => {
      if (!isAuthenticated) {
        onClose();
        navigate('/login');
        return;
      }
      dispatch(addToCart(item));
    },
    [dispatch, isAuthenticated, onClose, navigate]
  );

  const handleDecrease = useCallback(
    (id) => {
      if (!isAuthenticated) {
        onClose();
        navigate('/login');
        return;
      }
      dispatch(removeFromCart(id));
    },
    [dispatch, isAuthenticated, onClose, navigate]
  );

  const handleDelete = useCallback(
    (id) => {
      if (!isAuthenticated) {
        onClose();
        navigate('/login');
        return;
      }
      if (window.confirm('Are you sure you want to remove this item from cart?')) {
        dispatch(deleteItem(id));
      }
    },
    [dispatch, isAuthenticated, onClose, navigate]
  );

  const handleClearCart = useCallback(() => {
    if (!isAuthenticated) {
      onClose();
      navigate('/login');
      return;
    }
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart());
    }
  }, [dispatch, isAuthenticated, onClose, navigate]);

  const handleCheckout = useCallback(() => {
    if (!isAuthenticated) {
      onClose();
      navigate('/login');
      return;
    }
    alert(`🎉 Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
    dispatch(clearCart());
    onClose();
  }, [totalPrice, dispatch, onClose, isAuthenticated, navigate]);

  // Don't render if not authenticated
  if (!isAuthenticated) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-secondary-dark border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <FaShoppingCart className="text-highlight text-xl" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Cart</h2>
            <span className="px-2 py-0.5 bg-highlight/20 text-highlight text-xs rounded-full">
              {totalQuantity} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(100vh-250px)] scrollbar-hide">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 text-sm">Start shopping to add items to your cart</p>
              <button onClick={onClose} className="mt-4 btn-primary">
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 hover:border-highlight/30 transition-all duration-300 animate-slide-up"
                >
                  <div className="flex items-center gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-highlight font-bold text-sm">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <FaMinus className="text-xs text-gray-500 dark:text-gray-400" />
                        </button>
                        <span className="text-gray-800 dark:text-white font-medium text-sm min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <FaPlus className="text-xs text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total & Delete */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-gray-800 dark:text-white font-bold text-sm">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        aria-label="Delete item"
                      >
                        <FaTrash className="text-red-400 text-xs hover:text-red-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="w-full py-2 text-sm text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 rounded-lg transition-all duration-300 hover:bg-red-500/10"
                >
                  <FaTrash className="inline mr-2" />
                  Clear All Items
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer - Cart Summary */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-secondary-dark border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-800 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-gray-800 dark:text-white font-bold">Total</span>
                <span className="text-highlight font-bold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base"
              >
                <FaCreditCard />
                Proceed to Checkout
                <FaArrowRight />
              </button>
              <p className="text-xs text-gray-400 text-center mt-1">Free shipping on all orders</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

CartSidebar.displayName = 'CartSidebar';

export default CartSidebar;