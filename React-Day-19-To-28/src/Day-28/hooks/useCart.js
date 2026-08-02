import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import {
  addToCart,
  removeFromCart,
  deleteItem,
  clearCart,
  updateQuantity,
} from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  const addItem = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const removeItem = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const deleteItemFromCart = useCallback((id) => {
    dispatch(deleteItem(id));
  }, [dispatch]);

  const clearCartItems = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const updateItemQuantity = useCallback((id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const isInCart = useCallback((id) => {
    return items.some(item => item.id === id);
  }, [items]);

  const getItemQuantity = useCallback((id) => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  }, [items]);

  // Memoized values
  const cartTotal = useMemo(() => totalPrice, [totalPrice]);
  const itemCount = useMemo(() => totalQuantity, [totalQuantity]);

  return {
    items,
    totalQuantity,
    totalPrice,
    cartTotal,
    itemCount,
    addItem,
    removeItem,
    deleteItemFromCart,
    clearCartItems,
    updateItemQuantity,
    isInCart,
    getItemQuantity,
  };
};