import { configureStore } from '@reduxjs/toolkit';

import jumbleSentenceReducer from './reducers/jumbleSentenceSlice';
import jumbleWordReducer from './reducers/jumbleWordSlice';
import snackbarReducer from './reducers/snackbarSlice';
import themeSliceReducer from './reducers/themeSlice';

export default configureStore({
  reducer: {
    jumbleSentence: jumbleSentenceReducer,
    jumbleWord: jumbleWordReducer,
    snackbar: snackbarReducer,
    theme: themeSliceReducer,
  },
});
