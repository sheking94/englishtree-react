import { configureStore } from '@reduxjs/toolkit';

import { throttle } from 'lodash';

import { loadState, saveState } from './localStorage';

import jumbleSentenceReducer from './reducers/jumbleSentenceSlice';
import jumbleWordReducer from './reducers/jumbleWordSlice';
import snackbarReducer from './reducers/snackbarSlice';
import themeSliceReducer from './reducers/themeSlice';

const persistedState = loadState();

const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    jumbleSentence: jumbleSentenceReducer,
    jumbleWord: jumbleWordReducer,
    snackbar: snackbarReducer,
    theme: themeSliceReducer,
  },
});

store.subscribe(
  throttle(() => {
    saveState({
      theme: store.getState().theme,
    });
  }, 1000)
);

export default store;
