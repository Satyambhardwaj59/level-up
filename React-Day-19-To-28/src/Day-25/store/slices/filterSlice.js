import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  dateRange: {
    start: null,
    end: null,
  },
  searchTerm: '',
  sortBy: 'date-desc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.dateRange = { start: null, end: null };
      state.searchTerm = '';
      state.sortBy = 'date-desc';
    },
  },
});

export const { setCategory, setDateRange, setSearchTerm, setSortBy, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;