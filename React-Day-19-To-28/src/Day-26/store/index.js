import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Save cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('cartState', JSON.stringify(state.cart));
  } catch (error) {
    console.error('Failed to save cart state:', error);
  }
});

// Load cart from localStorage
const savedCart = localStorage.getItem('cartState');
if (savedCart) {
  try {
    const parsed = JSON.parse(savedCart);
    store.dispatch({ type: 'cart/loadFromStorage', payload: parsed });
  } catch (error) {
    console.error('Failed to load cart state:', error);
  }
}