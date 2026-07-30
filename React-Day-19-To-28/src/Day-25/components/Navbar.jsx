import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt, FaMoon, FaSun, FaUser, FaWallet } from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-white dark:bg-secondary-dark shadow-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <FaWallet className="text-2xl text-highlight" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              ExpenseTracker
            </span>
          </div>

          <div className="flex items-center gap-4">
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

            {isAuthenticated && (
              <>
                <div className="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaUser className="text-highlight" />
                  <span className="font-medium">{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-highlight text-white rounded-lg 
                           hover:bg-highlight/90 transition-all duration-300 hover:scale-105"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;