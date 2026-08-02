import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        toast.success('Item quantity increased!');
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
        toast.success('Item added to cart!');
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
          toast.success('Item quantity decreased!');
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
          toast.success('Item removed from cart!');
        }
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      toast.success('Item deleted from cart!');
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      toast.success('Cart cleared!');
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
      
      // Recalculate totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    loadFromStorage: (state, action) => {
      if (action.payload) {
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      }
    },
    
    // New reducer to reset cart on logout
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteItem,
  clearCart,
  updateQuantity,
  loadFromStorage,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;