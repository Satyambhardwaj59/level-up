import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { clearError } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, isAuthenticated, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      // Clear error on unmount
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
      <Helmet>
        <title>Login - ShopVerse</title>
        <meta name="description" content="Login to your ShopVerse account" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex flex-col">
        <Navbar />

        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-secondary-dark rounded-2xl shadow-xl p-8 animate-slide-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-highlight/10 rounded-full mb-4">
                  <FaSignInAlt className="text-4xl text-highlight" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Sign in to your ShopVerse account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt />
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>Demo Credentials: any email & password</p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    (No actual authentication required)
                  </p>
                </div>

                <div className="text-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Don't have an account?</span>
                  <Link to="/register" className="ml-2 text-highlight hover:underline">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Login;