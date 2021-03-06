import { createSlice } from '@reduxjs/toolkit';

export const jumbleSentenceSlice = createSlice({
  name: 'jumbleSentence',
  initialState: {
    addExcerciseCount: 0,
    category: null,
    data: [],
    excercise: [],
    sentence: null,
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
      state.data = [...state.data, { category: action.payload, sentences: [] }];
    },
    setDataSingleSentence: (state, action) => {
      state.data = state.data.map((el) => {
        if (el.category === state.category)
          return {
            category: el.category,
            sentences: [...el.sentences, action.payload],
          };
        return el;
      });
    },
    setExcercise: (state, action) => {
      state.excercise = action.payload;
    },
    setExcerciseDeleteSentence: (state, action) => {
      const excercise = state.excercise.map((el) => {
        if (el.category === action.payload.category) {
          return {
            category: el.category,
            sentences: el.sentences.filter(
              (el) => el.sentence !== action.payload.sentence
            ),
          };
        }
        return el;
      });
      state.excercise = excercise.filter((el) => el.sentences.length);
    },
    setExcerciseSingleSentence: (state, action) => {
      if (state.excercise === []) {
        state.excercise = [
          {
            category: state.category,
            sentences: [
              {
                sentence: action.payload.sentence,
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
              // if sentence exists
              if (el.sentences.map((el) => el.sentence).includes(state.sentence)) {
                throw new Error('Entered sentence already exists in this category!');
              }
              return {
                category: el.category,
                sentences: [
                  ...el.sentences,
                  {
                    sentence: action.payload.sentence,
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
              sentences: [
                {
                  sentence: action.payload.sentence,
                  shuffled: action.payload.shuffled,
                },
              ],
            },
          ];
        }
      }
    },
    setSentence: (state, action) => {
      state.sentence = action.payload;
    },
  },
});

export const {
  incrementAddExcerciseCount,
  setCategory,
  setData,
  setDataCategory,
  setDataSingleSentence,
  setExcercise,
  setExcerciseDeleteSentence,
  setExcerciseSingleSentence,
  setSentence,
} = jumbleSentenceSlice.actions;

export default jumbleSentenceSlice.reducer;
