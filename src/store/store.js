import { configureStore } from '@reduxjs/toolkit';

import jumbleSentenceReducer from './reducers/jumbleSentenceSlice';
import jumbleWordReducer from './reducers/jumbleWordSlice';
import snackbarReducer from './reducers/snackbarSlice';

export default configureStore({
  reducer: {
    jumbleSentence: jumbleSentenceReducer,
    jumbleWord: jumbleWordReducer,
    snackbar: snackbarReducer,
  },
});
