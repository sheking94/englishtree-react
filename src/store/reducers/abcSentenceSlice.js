import { createSlice } from '@reduxjs/toolkit';

export const abcSentenceSlice = createSlice({
  name: 'abcSentence',
  initialState: {
    addExcerciseCount: 0,
    answers: [],
    category: null,
    correct: 0,
    data: [],
    excercise: [],
    excerciseType: '',
    sentence: null,
  },

  reducers: {
    incrementAddExcerciseCount: (state) => {
      state.addExcerciseCount += 1;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setAnswersSingle: (state, action) => {
      state.answers[action.payload.index] = action.payload.value;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
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
    setExcerciseType: (state, action) => {
      state.excerciseType = action.payload;
    },
    setSentence: (state, action) => {
      state.sentence = action.payload;
    },
  },
});

export const {
  incrementAddExcerciseCount,
  setAnswers,
  setAnswersSingle,
  setCategory,
  setCorrect,
  setData,
  setDataCategory,
  setDataSingleSentence,
  setExcercise,
  setExcerciseDeleteSentence,
  setExcerciseSingleSentence,
  setExcerciseType,
  setSentence,
} = abcSentenceSlice.actions;

export default abcSentenceSlice.reducer;
