import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginUser, registerUser, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    return result;
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    const result = await dispatch(registerUser(userData));
    return result;
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logoutUser,
    clearError: clearAuthError, // Add this line
  };
};