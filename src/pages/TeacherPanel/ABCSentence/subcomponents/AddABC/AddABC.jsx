import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, makeStyles } from '@material-ui/core';

import {
  setAnswers,
  setAnswersSingle,
  setCategory,
  setCorrect,
  setDataCategory,
  setDataSingleSentence,
  setExcerciseSingleSentence,
  setSentence,
} from '../../../../../store/reducers/abcSentenceSlice';
import { setSnackbar } from '../../../../../store/reducers/snackbarSlice';

import {
  normalizeSentence,
  sentenceIsCorrect,
} from '../../../../../logic/sentenceLogic';
import { normalizeWord, wordIsCorrect } from '../../../../../logic/wordLogic';

import UniversalAutocompleteSelectAdd from '../../../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';
import UniversalSelect from '../../../../../components/universal/UniversalSelect/UniversalSelect';
import ABCRadioGroup from '../ABCRadioGroup/ABCRadioGroup';

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

const excerciseTypes = {
  TRUE_FALSE: 'True / False',
  ABC: '3 answers',
  ABCD: '4 answers',
};

const AddABC = () => {
  const [excerciseType, setExcerciseType] = useState(excerciseTypes.ABC);

  const category = useSelector((state) => state.abcSentence.category);
  const data = useSelector((state) => state.abcSentence.data);
  const sentence = useSelector((state) => state.abcSentence.sentence);
  const answers = useSelector((state) => state.abcSentence.answers);
  const correct = useSelector((state) => state.abcSentence.correct);

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

  const handleChangeExcerciseType = (event) => {
    setExcerciseType(event.target.value);
  };

  const handleChangeRadioInput = (event) => {
    const id = event.target.id;
    const index = Number(id.slice(id.indexOf('-') + 1));
    dispatch(setAnswersSingle({ index: index, value: event.target.value }));
  };

  const handleChangeRadioValue = (event) => {
    dispatch(setCorrect(Number(event.target.value)));
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

  // to do
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

  // to do
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

    const shuffledSentence = sentence;

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

  // set answers
  useEffect(() => {
    const setRadioAnswers = () => {
      switch (excerciseType) {
        case excerciseTypes.TRUE_FALSE:
          dispatch(setAnswers(['TRUE', 'FALSE']));
          dispatch(setCorrect(0));
          break;
        case excerciseTypes.ABC:
          dispatch(setAnswers(new Array(3).fill('')));
          dispatch(setCorrect(0));
          break;
        case excerciseTypes.ABCD:
          dispatch(setAnswers(new Array(4).fill('')));
          dispatch(setCorrect(0));
          break;
        default:
          break;
      }
    };
    setRadioAnswers();
  }, [excerciseType, dispatch]);

  return (
    <form className={classes.root}>
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeCategory}
        label="Category..."
        labelId="abcsentence-autocomplete-category"
        options={sortedCategories}
        value={category}
      />
      <UniversalAutocompleteSelectAdd
        handleChange={handleChangeSentence}
        label="Sentence..."
        labelId="abcsentence-autocomplete-sentence"
        options={sortedSentencesInCategory}
        value={sentence}
      />
      {/* maybe change to buttons +/- and add/delete elements from answers array */}
      <UniversalSelect
        handleChange={handleChangeExcerciseType}
        items={Object.values(excerciseTypes)}
        label="Excercise type..."
        labelId="abscentence-select-excercisetype"
        value={excerciseType}
      />
      <ABCRadioGroup
        answers={answers}
        correct={correct}
        changeInput={handleChangeRadioInput}
        changeRadio={handleChangeRadioValue}
        header="Answers:"
        tf={excerciseType === excerciseTypes.TRUE_FALSE}
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

export default AddABC;
