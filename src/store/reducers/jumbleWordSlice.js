import { createSlice } from '@reduxjs/toolkit';

export const jumbleWordSlice = createSlice({
  name: 'jumbleWord',
  initialState: {
    addExcerciseCount: 0,
    category: null,
    data: [],
    excercise: [],
    word: null,
  },

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
      const excercise = state.excercise.map((el) => {
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
      state.excercise = excercise.filter((el) => el.words.length);
    },
    setExcerciseSingleWord: (state, action) => {
      if (state.excercise === []) {
        state.excercise = [
          {
            category: state.category,
            words: [
              {
                word: action.payload.word,
                shuffled: action.payload.shuffled,
              },
            ],
          },
        ];
      } else {
        // if category exists
        if (state.excercise.map((el) => el.category).includes(state.category)) {
          state.excercise = state.excercise.map((el) => {
            if (el.category === state.category) {
              // if word exists
              if (el.words.map((word) => word.word).includes(state.word)) {
                throw new Error('Entered word already exists in this category!');
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
        } else {
          state.excercise = [
            ...state.excercise,
            {
              category: state.category,
              words: [
                {
                  word: action.payload.word,
                  shuffled: action.payload.shuffled,
                },
              ],
            },
          ];
        }
      }
    },
    setWord: (state, action) => {
      state.word = action.payload;
    },
  },
});

export const {
  incrementAddExcerciseCount,
  setCategory,
  setData,
  setDataCategory,
  setDataSingleWord,
  setExcercise,
  setExcerciseDeleteWord,
  setExcerciseSingleWord,
  setWord,
} = jumbleWordSlice.actions;

export default jumbleWordSlice.reducer;
