import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  loading: false,
  error: null,
};

const calculateTotals = (items) => {
  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
  
  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
  
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
      const totals = calculateTotals(state.items);
      state.totalIncome = totals.totalIncome;
      state.totalExpenses = totals.totalExpenses;
      state.balance = totals.balance;
    },
    editExpense: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
        const totals = calculateTotals(state.items);
        state.totalIncome = totals.totalIncome;
        state.totalExpenses = totals.totalExpenses;
        state.balance = totals.balance;
      }
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalIncome = totals.totalIncome;
      state.totalExpenses = totals.totalExpenses;
      state.balance = totals.balance;
    },
    loadFromStorage: (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        state.items = action.payload;
        const totals = calculateTotals(state.items);
        state.totalIncome = totals.totalIncome;
        state.totalExpenses = totals.totalExpenses;
        state.balance = totals.balance;
      }
    },
    clearAll: (state) => {
      state.items = [];
      state.totalIncome = 0;
      state.totalExpenses = 0;
      state.balance = 0;
    },
  },
});

export const { addExpense, editExpense, deleteExpense, loadFromStorage, clearAll } = expenseSlice.actions;
export default expenseSlice.reducer;