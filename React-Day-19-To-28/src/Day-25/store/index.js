import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';
import filterReducer from './slices/filterSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['expenses/loadFromStorage'],
      },
    }),
});

// Load initial state from localStorage
const savedState = localStorage.getItem('expenseTrackerState');
if (savedState) {
  try {
    const parsed = JSON.parse(savedState);
    if (parsed.expenses) {
      store.dispatch({ type: 'expenses/loadFromStorage', payload: parsed.expenses });
    }
    if (parsed.auth?.user) {
      store.dispatch({ type: 'auth/loadFromStorage', payload: parsed.auth.user });
    }
    if (parsed.theme) {
      store.dispatch({ type: 'theme/loadFromStorage', payload: parsed.theme });
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
}

// Save state to localStorage on changes
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('expenseTrackerState', JSON.stringify({
      expenses: state.expenses,
      auth: state.auth,
      theme: state.theme,
    }));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
});