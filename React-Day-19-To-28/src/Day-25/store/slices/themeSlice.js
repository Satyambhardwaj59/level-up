import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    loadFromStorage: (state, action) => {
      if (action.payload) {
        state.mode = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme, loadFromStorage } = themeSlice.actions;
export default themeSlice.reducer;