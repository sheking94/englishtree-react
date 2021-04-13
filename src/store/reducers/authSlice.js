import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: true,
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    changeLoginState: (state) => {
      state.signedIn = !state.signedIn;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoginState } = authSlice.actions;

export default authSlice.reducer;
