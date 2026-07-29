import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_API_URL;

export const movieApi = {
  searchMovies: async (query, page = 1, type = '') => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
          page,
          type: type || undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movies. Please try again.');
    }
  },

  getMovieDetails: async (imdbID) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'full',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie details. Please try again.');
    }
  },
};