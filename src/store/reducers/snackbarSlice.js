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

  reducers: {
    setSnackbar: (state, action) => {
      state.snackbarData = {
        ...state.snackbarData,
        ...action.payload,
      };
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
