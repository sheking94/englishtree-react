import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    type: 'light',
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    changeTheme: (state) => {
      state.type = state.type === 'light' ? 'dark' : 'light';
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
