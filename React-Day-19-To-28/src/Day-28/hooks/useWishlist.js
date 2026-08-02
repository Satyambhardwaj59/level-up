import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} from '../store/slices/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const addItem = useCallback((product) => {
    dispatch(addToWishlist(product));
  }, [dispatch]);

  const removeItem = useCallback((id) => {
    dispatch(removeFromWishlist(id));
  }, [dispatch]);

  const toggleItem = useCallback((product) => {
    dispatch(toggleWishlist(product));
  }, [dispatch]);

  const isInWishlist = useCallback((id) => {
    return items.some(item => item.id === id);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    wishlistCount: items.length,
  };
};