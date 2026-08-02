import  { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCode,
  FaShoppingBag,
} from 'react-icons/fa';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-secondary-dark border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors duration-300">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <FaShoppingBag className="text-highlight text-2xl" />
              <span className="text-xl font-bold bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
                ShopVerse
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your premium destination for quality products. Shop the best deals with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={scrollToTop} className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-highlight transition-colors text-sm">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Categories</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm hover:text-highlight transition-colors cursor-pointer">
                Electronics
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm hover:text-highlight transition-colors cursor-pointer">
                Jewelery
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm hover:text-highlight transition-colors cursor-pointer">
                Men's Clothing
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm hover:text-highlight transition-colors cursor-pointer">
                Women's Clothing
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Developer</h4>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                <span className="font-medium">Name:</span> Satyam Kumar
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a
                  href="mailto:satyam@example.com"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110"
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
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {currentYear} <span className="text-highlight font-semibold">Satyam Kumar</span>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-600"> • All Rights Reserved</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="hover:text-highlight transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className="hover:text-highlight transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;