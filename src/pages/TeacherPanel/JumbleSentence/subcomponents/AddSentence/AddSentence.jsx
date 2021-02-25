import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, makeStyles } from '@material-ui/core';

import {
  setCategory,
  setDataCategory,
  setDataSingleSentence,
  setExcerciseSingleSentence,
  setSentence,
} from '../../../../../store/reducers/jumbleSentenceSlice';
import { setSnackbar } from '../../../../../store/reducers/snackbarSlice';

import { shuffleArray } from '../../../../../logic/arrayLogic';
import {
  arrayToSentence,
  normalizeSentence,
  normalizeSentenceToArray,
  sentenceIsCorrect,
} from '../../../../../logic/sentenceLogic';
import { normalizeWord, wordIsCorrect } from '../../../../../logic/wordLogic';

import UniversalAutocompleteSelectAdd from '../../../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';

const shuffleSentence = (sentence) => {
  // create an array from the word
  const sentenceArray = normalizeSentenceToArray(sentence);
  let shuffledSentence = arrayToSentence(shuffleArray(sentenceArray));

  // if shuffledSentence is the same as sentence,
  // shuffle again (cannot become an infinite loop
  // because of wordIsCorrect function)
  while (shuffledSentence === sentence)
    shuffledSentence = arrayToSentence(shuffleArray(sentenceArray));

  return shuffledSentence;
};

const sortCategories = (data) => data.map((el) => el.category).sort();

const sortSentencesInCategory = (category, data) => {
  let sentencesInCategory = [];
  data.forEach((el) => {
    if (el.category === category)
      // shallow copy
      sentencesInCategory = el.sentences.slice();
  });
  return sentencesInCategory.sort();
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

const AddSentence = () => {
  const category = useSelector((state) => state.jumbleSentence.category);
  const data = useSelector((state) => state.jumbleSentence.data);
  const sentence = useSelector((state) => state.jumbleSentence.sentence);

  const classes = useStyles();

  const dispatch = useDispatch();

  // create list of sorted categories
  const sortedCategories = sortCategories(data);

  // create list of sorted sentences in category
  const sortedSentencesInCategory = sortSentencesInCategory(category, data);

  const handleChangeCategory = (event, newValue) => {
    dispatch(
      setCategory(newValue && newValue.inputValue ? newValue.inputValue : newValue)
    );
  };

  const handleChangeSentence = (event, newValue) => {
    dispatch(
      setSentence(newValue && newValue.inputValue ? newValue.inputValue : newValue)
    );
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

    // push to categories array
    dispatch(setDataCategory(categoryNormalized));
  };

  const addSentence = () => {
    // normalize entered string
    const sentenceNormalized = normalizeSentence(sentence);

    // check if the input sentence already exists in sentences
    if (sortedSentencesInCategory.includes(sentenceNormalized)) {
      // nothing to do
      return;
    }

    // check if the input sentence string is correct
    if (!sentenceIsCorrect(sentenceNormalized))
      throw new Error('Enter a correct sentence!');

    // set sentence to normalized sentence
    dispatch(setSentence(sentenceNormalized));

    // push to sentences
    dispatch(setDataSingleSentence(sentenceNormalized));
  };

  const handleAddSentenceClick = () => {
    // add category and word to data
    try {
      addCategory();
      addSentence();
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

    const shuffledSentence = shuffleSentence(sentence);

    // push sentence to the excercise array
    try {
      dispatch(
        setExcerciseSingleSentence({
          sentence: sentence,
          shuffled: shuffledSentence,
        })
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.message,
          severity: 'error',
        })
      );
    }

    // clear input field
    dispatch(setSentence(null));
    // category stays
    // setCategory(null);
  };

  return (
    <form className={classes.root}>
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeCategory}
        label="Category..."
        labelId="jumblesentence-autocomplete-category"
        options={sortedCategories}
        value={category}
      />
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeSentence}
        label="Sentence..."
        labelId="jumblesentence-autocomplete-sentence"
        options={sortedSentencesInCategory}
        value={sentence}
      />
      <Button
        color="primary"
        disabled={!Boolean(category) || !Boolean(sentence)}
        onClick={handleAddSentenceClick}
        size="large"
        variant="contained"
      >
        Add sentence
      </Button>
    </form>
  );
};

export default AddSentence;
