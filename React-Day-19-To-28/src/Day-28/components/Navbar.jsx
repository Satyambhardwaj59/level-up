import { memo, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaShoppingBag,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUserPlus,
} from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import { resetCart } from '../store/slices/cartSlice';
import { resetWishlist } from '../store/slices/wishlistSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import CartSidebar from './CartSidebar';
import toast from 'react-hot-toast';

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  // Only show cart and wishlist counts when authenticated
  const showCartCount = isAuthenticated && totalQuantity > 0;
  const showWishlistCount = isAuthenticated && wishlistItems.length > 0;

  const handleLogout = () => {
    // Clear cart and wishlist from Redux store
    dispatch(resetCart());
    dispatch(resetWishlist());
    // Logout user
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <nav className="bg-white dark:bg-secondary-dark shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <FaShoppingBag className="text-2xl text-highlight transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-xl font-bold bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
                ShopVerse
              </span>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {mode === 'light' ? (
                  <FaMoon className="text-gray-600 dark:text-gray-300 text-xl" />
                ) : (
                  <FaSun className="text-yellow-400 text-xl" />
                )}
              </button>

              {/* Wishlist - Only show when authenticated */}
              {isAuthenticated && (
                <Link
                  to="/wishlist"
                  className="relative p-2 hover:bg-highlight/10 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <FaHeart className="text-2xl text-gray-600 dark:text-gray-300" />
                  {showWishlistCount && (
                    <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart - Only show when authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:bg-highlight/10 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="Open cart"
                >
                  <FaShoppingCart className="text-2xl text-gray-600 dark:text-gray-300" />
                  {showCartCount && (
                    <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FaUser className="text-highlight" />
                    <span className="font-medium">{user?.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-highlight/10 rounded-lg transition-colors"
                    aria-label="Logout"
                  >
                    <FaSignOutAlt className="text-gray-600 dark:text-gray-300 text-xl" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-highlight transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <FaUserPlus />
                    <span className="hidden sm:inline">Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Only render CartSidebar when authenticated */}
      {isAuthenticated && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;