import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        toast.success('Added to wishlist! ❤️');
      } else {
        toast.error('Already in wishlist!');
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      toast.success('Removed from wishlist!');
    },
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.items.push(action.payload);
        toast.success('Added to wishlist! ❤️');
      } else {
        state.items.splice(index, 1);
        toast.success('Removed from wishlist!');
      }
    },
    loadFromStorage: (state, action) => {
      if (action.payload) {
        state.items = action.payload.items || [];
      }
    },
    // New reducer to reset wishlist on logout
    resetWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  loadFromStorage,
  resetWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;