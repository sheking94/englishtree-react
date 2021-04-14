import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: false,
  },

  reducers: {
    changeLoginState: (state) => {
      state.signedIn = !state.signedIn;
    },
  },
});

export const { changeLoginState } = authSlice.actions;

export default authSlice.reducer;
