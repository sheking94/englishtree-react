import { configureStore } from '@reduxjs/toolkit';

import jumbleWordReducer from './reducers/jumbleWordSlice';

export default configureStore({
  reducer: {
    jumbleWord: jumbleWordReducer,
  },
});
