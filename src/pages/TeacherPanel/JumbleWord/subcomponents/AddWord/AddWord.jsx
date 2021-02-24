import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, makeStyles } from '@material-ui/core';

import {
  setCategory,
  setDataCategory,
  setDataSingleWord,
  setExcerciseEmptyCategory,
  setExcerciseSingleWord,
  setSnackbar,
  setWord,
} from '../../../../../store/reducers/jumbleWordSlice';

import { shuffleArray } from '../../../../../logic/arrayLogic';
import { normalizeWord, wordIsCorrect } from '../../../../../logic/wordLogic';

import UniversalAutocompleteSelectAdd from '../../../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';

const shuffleWord = (word) => {
  // create an array from the word
  const wordToArray = word.split('');
  let shuffledWord = shuffleArray(wordToArray).join('');

  // if shuffledWord is the same as word,
  // shuffle again (cannot become an infinite loop
  // because of wordIsCorrect function)
  while (shuffledWord === word) shuffledWord = shuffleArray(wordToArray).join('');

  return shuffledWord;
};

const sortWordsInCategory = (category, data) => {
  let wordsInCategory = [];
  data.forEach((el) => {
    if (el.category === category)
      // shallow copy
      wordsInCategory = el.words.slice();
  });
  return wordsInCategory.sort();
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    flexDirection: 'column',
    flexGrow: 1,
    '& > *': {
      minWidth: '100%',
    },
  },
}));

const AddWord = () => {
  const category = useSelector((state) => state.jumbleWord.category);
  const data = useSelector((state) => state.jumbleWord.data);
  const word = useSelector((state) => state.jumbleWord.word);

  const classes = useStyles();

  const dispatch = useDispatch();

  // create list of sorted categories
  const sortedCategories = data.map((el) => el.category).sort();

  // create list of sorted words in category
  const sortedWordsInCategory = sortWordsInCategory(category, data);

  const handleChangeCategory = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      dispatch(setCategory(newValue.inputValue));
    } else {
      dispatch(setCategory(newValue));
    }
  };

  const handleChangeWord = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      dispatch(setWord(newValue.inputValue));
    } else {
      dispatch(setWord(newValue));
    }
  };

  const addCategory = () => {
    // normalize entered string
    const categoryNormalized = normalizeWord(category);

    // check if the input category already exists in categories
    if (sortedCategories.includes(categoryNormalized)) {
      // nothing to do
      return;
    }

    // check if the input category string is correct
    if (!wordIsCorrect(categoryNormalized))
      throw new Error('Enter a correct category!');

    // set category to normalized category
    dispatch(setCategory(categoryNormalized));

    // push to categories array...
    dispatch(setDataCategory(categoryNormalized));

    // ...and create an object in the excercise array
    dispatch(setExcerciseEmptyCategory(categoryNormalized));
  };

  const addWord = () => {
    // normalize entered string
    const wordNormalized = normalizeWord(word);

    // check if the input word already exists in words
    if (sortedWordsInCategory.includes(wordNormalized)) {
      // nothing to do
      return;
    }

    // check if the input word string is correct
    if (!wordIsCorrect(wordNormalized)) throw new Error('Enter a correct word!');

    // set word to normalized word
    dispatch(setWord(wordNormalized));

    // push to words
    dispatch(setDataSingleWord(wordNormalized));
  };

  const handleAddWordClick = () => {
    // add category and word to data
    try {
      addCategory();
      addWord();
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.message,
          severity: 'error',
        })
      );
      return;
    }

    const shuffledWord = shuffleWord(word);

    // push words to the excercise array
    dispatch(setExcerciseSingleWord({ word: word, shuffled: shuffledWord }));

    // clear input field
    dispatch(setWord(null));
    // category stays
    // setCategory(null);
  };

  return (
    <form className={classes.root}>
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeCategory}
        label="Category..."
        labelId="jumblewords-autocomplete-category"
        options={sortedCategories}
        value={category}
      />
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeWord}
        label="Word..."
        labelId="jumblewords-autocomplete-words"
        options={sortedWordsInCategory}
        value={word}
      />
      <Button
        color="primary"
        disabled={!Boolean(category) || !Boolean(word)}
        onClick={handleAddWordClick}
        size="large"
        variant="contained"
      >
        Add word
      </Button>
    </form>
  );
};

export default AddWord;
