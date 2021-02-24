import { createSlice } from '@reduxjs/toolkit';

export const jumbleWordSlice = createSlice({
  name: 'jumbleWord',
  initialState: {
    addExcerciseCount: 0,
    category: null,
    data: [],
    excercise: [],
    snackbarData: {
      open: false,
      message: 'Default snackbar alert.',
      severity: 'info',
    },
    word: null,
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    incrementAddExcerciseCount: (state) => {
      state.addExcerciseCount += 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataCategory: (state, action) => {
      state.data = [...state.data, { category: action.payload, words: [] }];
    },
    setDataSingleWord: (state, action) => {
      state.data = state.data.map((el) => {
        if (el.category === state.category)
          return { category: el.category, words: [...el.words, action.payload] };
        return el;
      });
    },
    setExcercise: (state, action) => {
      state.excercise = action.payload;
    },
    setExcerciseDeleteWord: (state, action) => {
      state.excercise = state.excercise.map((el) => {
        if (el.category === action.payload.category) {
          return {
            category: el.category,
            words: el.words.filter(
              (wordObject) => wordObject.word !== action.payload.word
            ),
          };
        }
        return el;
      });
    },
    setExcerciseEmptyCategory: (state, action) => {
      state.excercise = [
        ...state.excercise,
        { category: action.payload, words: [] },
      ];
    },
    setExcerciseSingleWord: (state, action) => {
      state.excercise = state.excercise.map((el) => {
        if (el.category === state.category) {
          for (const wordObject of el.words) {
            if (wordObject.word === state.word) {
              state.snackbarData = {
                open: true,
                message: 'Entered word already exists in this category!',
                severity: 'error',
              };
              return el;
            }
          }
          return {
            category: el.category,
            words: [
              ...el.words,
              {
                word: action.payload.word,
                shuffled: action.payload.shuffled,
              },
            ],
          };
        }
        return el;
      });
    },
    setSnackbar: (state, action) => {
      state.snackbarData = {
        ...state.snackbarData,
        ...action.payload,
      };
    },
    setWord: (state, action) => {
      state.word = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementAddExcerciseCount,
  setCategory,
  setData,
  setDataCategory,
  setDataSingleWord,
  setExcercise,
  setExcerciseDeleteWord,
  setExcerciseEmptyCategory,
  setExcerciseSingleWord,
  setSnackbar,
  setWord,
} = jumbleWordSlice.actions;

export default jumbleWordSlice.reducer;
