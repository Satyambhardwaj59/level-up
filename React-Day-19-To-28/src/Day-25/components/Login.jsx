import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser, FaLock, FaSignInAlt, FaWallet } from 'react-icons/fa';
import { loginSuccess } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation - In production, this would be a real API call
    if (formData.email && formData.password) {
      // Demo login - accept any credentials
      dispatch(loginSuccess({
        id: '1',
        name: formData.email.split('@')[0] || 'User',
        email: formData.email,
      }));
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-[80vh] mt-10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card animate-slide-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-highlight/10 rounded-full mb-4">
              <FaWallet className="text-4xl text-highlight" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to manage your expenses
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
              className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-3"
            >
              <FaSignInAlt />
              Sign In
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Demo Credentials: any email & password</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                (No actual authentication required)
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;