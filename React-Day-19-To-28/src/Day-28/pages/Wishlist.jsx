
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <>
      <Helmet>
        <title>Wishlist - ShopVerse</title>
        <meta name="description" content="Your wishlist items" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />

        <main className="flex-grow container-custom py-8">
          <div className="flex items-center gap-3 mb-8">
            <FaHeart className="text-3xl text-highlight" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Wishlist</h1>
            <span className="px-3 py-1 bg-highlight/20 text-highlight rounded-full text-sm font-semibold">
              {items.length} items
            </span>
          </div>

          <ErrorBoundary>
            {items.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-secondary-dark rounded-xl shadow-lg">
                <div className="text-6xl mb-4">💔</div>
                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-400 mb-6">Start adding items you love to your wishlist</p>
                <Link to="/" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-secondary-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <Link to={`/product/${item.id}`}>
                      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-highlight font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </Link>
                    <div className="p-4 pt-0 flex gap-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Wishlist;