import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: localStorage.getItem('theme') || 'light',
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
      document.documentElement.classList.toggle('dark');
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    loadFromStorage: (state, action) => {
      if (action.payload) {
        state.mode = action.payload.mode || 'light';
        if (state.mode === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    },
  },
});

export const { toggleTheme, setTheme, loadFromStorage } = themeSlice.actions;
export default themeSlice.reducer;