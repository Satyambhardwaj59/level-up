import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const productApi = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products. Please try again.');
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product details. Please try again.');
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories. Please try again.');
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products by category. Please try again.');
    }
  },
};