import { configureStore } from '@reduxjs/toolkit';

import { throttle } from 'lodash';

import { loadState, saveState } from './localStorage';

import authReducer from './reducers/authSlice';
import abcSentenceReducer from './reducers/abcSentenceSlice';
import jumbleSentenceReducer from './reducers/jumbleSentenceSlice';
import jumbleWordReducer from './reducers/jumbleWordSlice';
import snackbarReducer from './reducers/snackbarSlice';
import themeSliceReducer from './reducers/themeSlice';

const persistedState = loadState();

const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    auth: authReducer,
    abcSentence: abcSentenceReducer,
    jumbleSentence: jumbleSentenceReducer,
    jumbleWord: jumbleWordReducer,
    snackbar: snackbarReducer,
    theme: themeSliceReducer,
  },
});

store.subscribe(
  throttle(() => {
    saveState({
      auth: store.getState().auth,
      abcSentence: store.getState().abcSentence,
      jumbleSentence: store.getState().jumbleSentence,
      jumbleWord: store.getState().jumbleWord,
      theme: store.getState().theme,
    });
  }, 1000)
);

export default store;
