import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash, FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import { deleteExpense } from '../store/slices/expenseSlice';
import { setCategory, setSearchTerm, setSortBy, resetFilters } from '../store/slices/filterSlice';
import ExpenseForm from './ExpenseForm';
import { format } from 'date-fns';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.expenses);
  const { category, searchTerm, sortBy } = useSelector((state) => state.filters);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ['all', 'Food', 'Travel', 'Shopping', 'Utilities', 'Rent', 'Healthcare', 'Education', 'Entertainment', 'Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.description.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
      );
    }

    // Sort items
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    return filtered;
  }, [items, category, searchTerm, sortBy]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteExpense(id));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  const totalFilteredAmount = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.amount, 0);
  }, [filteredItems]);

  const totalFilteredIncome = useMemo(() => {
    return filteredItems
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);
  }, [filteredItems]);

  const totalFilteredExpenses = useMemo(() => {
    return filteredItems
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);
  }, [filteredItems]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="select-field min-w-[120px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FaSort className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="select-field min-w-[140px]"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="btn-secondary text-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* Filter Summary */}
        {filteredItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Showing {filteredItems.length} transactions
              </span>
              <span className="text-green-500">
                Income: ${totalFilteredIncome.toFixed(2)}
              </span>
              <span className="text-red-500">
                Expenses: ${totalFilteredExpenses.toFixed(2)}
              </span>
              <span className="font-semibold">
                Total: ${totalFilteredAmount.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              No transactions found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              {items.length === 0 
                ? 'Start adding your expenses and income!'
                : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="card hover:shadow-lg transition-all duration-300 animate-slide-in"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-12 rounded-full ${
                      item.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {item.description}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                          {item.category}
                        </span>
                        <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold ${
                    item.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm
          editingItem={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default ExpenseList;