import { configureStore } from '@reduxjs/toolkit';

import jumbleWordReducer from './reducers/jumbleWordSlice';
import snackbarReducer from './reducers/snackbarSlice';

export default configureStore({
  reducer: {
    jumbleWord: jumbleWordReducer,
    snackbar: snackbarReducer,
  },
});
