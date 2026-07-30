import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import { FaPlus } from 'react-icons/fa';
import Footer from './components/Footer';

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Apply theme
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark transition-colors duration-300">
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen scrollbar-hide bg-gray-50 dark:bg-primary-dark transition-colors duration-300">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-highlight text-white shadow-lg shadow-highlight/20'
                  : 'bg-white dark:bg-secondary-dark text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'transactions'
                  ? 'bg-highlight text-white shadow-lg shadow-highlight/20'
                  : 'bg-white dark:bg-secondary-dark text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Transactions
            </button>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FaPlus />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' ? <Dashboard /> : <ExpenseList />}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <ExpenseForm
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
       <Footer />
    </div>
  );
}

export default Home;