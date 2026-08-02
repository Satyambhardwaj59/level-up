import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/REHYDRATE'],
      },
    }),
});

// Save state to localStorage (only when authenticated)
store.subscribe(() => {
  const state = store.getState();
  try {
    // Only save if user is authenticated
    if (state.auth.isAuthenticated) {
      localStorage.setItem('ecommerceState', JSON.stringify({
        auth: state.auth,
        cart: state.cart,
        wishlist: state.wishlist,
        theme: state.theme,
      }));
    } else {
      // If not authenticated, remove from localStorage
      localStorage.removeItem('ecommerceState');
    }
  } catch (error) {
    console.error('Failed to save state:', error);
  }
});

// Load state from localStorage (only if authenticated)
const savedState = localStorage.getItem('ecommerceState');
if (savedState) {
  try {
    const parsed = JSON.parse(savedState);
    if (parsed.auth && parsed.auth.isAuthenticated) {
      if (parsed.auth) {
        store.dispatch({ type: 'auth/loadFromStorage', payload: parsed.auth });
      }
      if (parsed.cart) {
        store.dispatch({ type: 'cart/loadFromStorage', payload: parsed.cart });
      }
      if (parsed.wishlist) {
        store.dispatch({ type: 'wishlist/loadFromStorage', payload: parsed.wishlist });
      }
      if (parsed.theme) {
        store.dispatch({ type: 'theme/loadFromStorage', payload: parsed.theme });
      }
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
}