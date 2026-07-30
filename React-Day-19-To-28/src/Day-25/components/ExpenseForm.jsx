import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
import { addExpense, editExpense } from '../store/slices/expenseSlice';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Food', 'Travel', 'Shopping', 'Utilities', 'Rent', 'Healthcare', 'Education', 'Entertainment', 'Other'],
};

const ExpenseForm = ({ editingItem, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: 'expense',
    category: 'Food',
    amount: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        type: editingItem.type,
        category: editingItem.category,
        amount: editingItem.amount.toString(),
        description: editingItem.description,
        date: editingItem.date,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates = { [name]: value };
      
      // Auto-select category when type changes
      if (name === 'type') {
        updates.category = value === 'income' ? 'Salary' : 'Food';
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const expenseData = {
      id: editingItem?.id || uuidv4(),
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description || 'No description',
      date: formData.date,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
    };

    if (editingItem) {
      dispatch(editExpense({ id: editingItem.id, updates: expenseData }));
    } else {
      dispatch(addExpense(expenseData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-secondary-dark rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {editingItem ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
                  formData.type === 'expense'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
                  formData.type === 'income'
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select-field"
            >
              {categories[formData.type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              step="0.01"
              min="0"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2 py-3"
          >
            {editingItem ? (
              <>
                <FaEdit /> Update Transaction
              </>
            ) : (
              <>
                <FaPlus /> Add Transaction
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;