import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaGithub, 
  FaTwitter, 
  FaLinkedinIn, 
  FaEnvelope,
  FaCode,
  FaShoppingBag,
  FaArrowUp,
  FaNewspaper,
  FaCheckCircle
} from 'react-icons/fa';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary/80 backdrop-blur-sm border-t border-highlight/20 mt-12 transition-colors duration-300">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <FaShoppingBag className="text-highlight text-2xl animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-highlight to-pink-500 bg-clip-text text-transparent">
                ProductCatalog
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover amazing products with performance optimization. Built with React, Redux Toolkit, and Tailwind CSS.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-500">
                🚀 Optimized for speed
              </span>
              <span className="text-xs text-gray-500">
                📱 Fully responsive
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-highlight transition-colors text-sm flex items-center gap-2 group"
                >
                  <FaArrowUp className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </button>
              </li>
              <li>
                <Link 
                  to="/"
                  className="text-gray-400 hover:text-highlight transition-colors text-sm hover:pl-2 transition-all"
                >
                  All Products
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const searchInput = document.querySelector('input[type="text"]');
                    if (searchInput) {
                      searchInput.focus();
                      searchInput.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-highlight transition-colors text-sm hover:pl-2 transition-all"
                >
                  🔍 Search
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const filters = document.querySelector('.filter-section');
                    if (filters) {
                      filters.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-gray-400 hover:text-highlight transition-colors text-sm hover:pl-2 transition-all"
                >
                  🎯 Filters
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
            <ul className="space-y-2">
              {['Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"].map((category) => (
                <li 
                  key={category}
                  className="text-gray-400 text-sm hover:text-highlight transition-colors cursor-pointer hover:pl-2 transition-all"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Info & Newsletter */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-3">Developer</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <span className="font-medium">Name:</span> Satyam Kumar
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-medium">Tech Stack:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-highlight/10 text-highlight text-xs rounded-full">
                  React
                </span>
                <span className="px-2 py-0.5 bg-highlight/10 text-highlight text-xs rounded-full">
                  Redux
                </span>
                <span className="px-2 py-0.5 bg-highlight/10 text-highlight text-xs rounded-full">
                  Tailwind
                </span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/satyamkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a
                  href="mailto:satyam@example.com"
                  className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label="Email"
                >
                  <FaEnvelope className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaNewspaper className="text-highlight text-xl" />
              <span className="text-sm text-gray-300">
                Subscribe for product updates
              </span>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-primary/50 border border-gray-700 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:border-highlight 
                         focus:ring-2 focus:ring-highlight/20 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-highlight text-white rounded-lg hover:bg-highlight/90 
                         transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-2 text-green-500 animate-fade-in">
                <FaCheckCircle />
                <span className="text-sm">Subscribed!</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider with animated line */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-secondary px-4 text-xs text-gray-500">
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
          <p className="text-xs text-gray-500">
            © {currentYear} <span className="text-highlight font-semibold">Satyam Kumar</span>
            <span className="hidden sm:inline text-gray-600"> • All Rights Reserved</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="hover:text-highlight transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-highlight transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-highlight transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;