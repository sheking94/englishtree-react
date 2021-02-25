import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbarData: {
      autoHide: 3000,
      open: false,
      message: 'Default snackbar alert.',
      severity: 'info',
    },
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    setSnackbar: (state, action) => {
      state.snackbarData = {
        ...state.snackbarData,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
