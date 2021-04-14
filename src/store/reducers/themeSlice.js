import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    type: 'light',
  },

  reducers: {
    changeTheme: (state) => {
      state.type = state.type === 'light' ? 'dark' : 'light';
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
