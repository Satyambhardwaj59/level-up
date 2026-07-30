import React, { useState } from 'react';
import { 
  FaHeart, 
  FaGithub, 
  FaTwitter, 
  FaLinkedinIn, 
  FaEnvelope,
  FaCode,
  FaWallet,
  FaArrowUp,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';

const Footer = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 p-3 bg-highlight text-white rounded-full 
                   shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 
                   animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      <footer className="bg-white dark:bg-secondary-dark border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <FaWallet className="text-highlight text-2xl" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  ExpenseTracker
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Take control of your finances with our easy-to-use expense tracking application.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle theme"
                >
                  {mode === 'light' ? (
                    <FaMoon className="text-gray-600 dark:text-gray-300" />
                  ) : (
                    <FaSun className="text-yellow-400" />
                  )}
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={scrollToTop}
                    className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const dashboard = document.querySelector('[data-tab="dashboard"]');
                      if (dashboard) dashboard.click();
                      scrollToTop();
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const transactions = document.querySelector('[data-tab="transactions"]');
                      if (transactions) transactions.click();
                      scrollToTop();
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm"
                  >
                    Transactions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const addBtn = document.querySelector('.btn-primary');
                      if (addBtn) addBtn.click();
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm"
                  >
                    Add Expense
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Categories
              </h4>
              <ul className="space-y-1">
                <li className="text-gray-600 dark:text-gray-400 text-sm">Food & Dining</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm">Travel & Transport</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm">Shopping & Retail</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm">Utilities & Bills</li>
                <li className="text-gray-600 dark:text-gray-400 text-sm">Entertainment</li>
              </ul>
            </div>

            {/* Developer Info */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Developer
              </h4>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium">Name:</span> Satyam Kumar
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/satyamkumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/satyamkumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/satyamkumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:satyam@example.com"
                    className="text-gray-500 dark:text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                    aria-label="Email"
                  >
                    <FaEnvelope className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-secondary-dark px-4 text-xs text-gray-400 dark:text-gray-500">
                <FaCode className="w-3 h-3 inline text-highlight" /> 
                <span className="mx-2">•</span>
                Built with <FaHeart className="w-3 h-3 inline text-highlight fill-highlight mx-1 animate-pulse" /> 
                using React & Redux Toolkit
                <span className="mx-2">•</span>
                Version 1.0.0
              </span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400 dark:text-gray-600">
              © {currentYear} <span className="text-highlight font-semibold">Satyam Kumar</span>
              <span className="hidden sm:inline"> • All Rights Reserved</span>
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-600">
              <span>Privacy Policy</span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span>Terms of Service</span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;