import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import uniqid from 'uniqid';

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { shuffleArray } from '../../../logic/arrayLogic';
import { normalizeWord, wordIsCorrect } from '../../../logic/wordLogic';

import ShowExcercise from './subcomponents/ShowExcercise/ShowExcercise';
import UniversalAutocompleteSelectAdd from '../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';
import UniversalSnackbarAlert from '../../../components/universal/UniversalSnackbarAlert/UniversalSnackbarAlert';

// simulate fetching data
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => {
  await sleep(500);
  const data = [
    {
      category: 'sport',
      words: ['football', 'tennis', 'cricket', 'swimming'],
    },
    {
      category: 'family',
      words: ['mother', 'father', 'son', 'daughter'],
    },
    {
      category: 'animals',
      words: [],
    },
    {
      category: 'food',
      words: ['hamburger', 'pizza', 'sandwich'],
    },
  ];
  return data;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
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

// filter for autocomplete
const filter = createFilterOptions();

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

// component
const JumbleWord = () => {
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [word, setWord] = useState(null);
  const [excercise, setExcercise] = useState([]);
  const [addExcerciseCount, setAddExcerciseCount] = useState(0);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: 'Default snackbar alert.',
    severity: 'info',
  });

  const classes = useStyles();

  const handleChangeCategory = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setCategory(newValue.inputValue);
    } else {
      setCategory(newValue);
    }
  };

  const handleChangeWord = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setWord(newValue.inputValue);
    } else {
      setWord(newValue);
    }
  };

  const filterAutocomplete = (options, params) => {
    const filtered = filter(options, params);

    // Suggest the creation of a new value
    if (params.inputValue !== '') {
      filtered.push(params.inputValue);
    }

    return filtered;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const addCategory = () => {
    // normalize entered string
    const categoryNormalized = normalizeWord(category);

    // check if the input category already exists in categories
    if (sortedCategories().includes(categoryNormalized)) {
      // nothing to do
      return;
    }

    // check if the input category string is correct
    if (!wordIsCorrect(categoryNormalized))
      throw new Error('Enter a correct category!');

    // set category to normalized category
    setCategory(categoryNormalized);

    // push to categories array...
    setData((prev) => [...prev, { category: categoryNormalized, words: [] }]);

    // ...and create an object in the excercise array
    setExcercise((prev) => [...prev, { category: categoryNormalized, words: [] }]);
  };

  const addWord = () => {
    // normalize entered string
    const wordNormalized = normalizeWord(word);

    // check if the input word already exists in words
    if (sortedWordsInCategory().includes(wordNormalized)) {
      // nothing to do
      return;
    }

    // check if the input word string is correct
    if (!wordIsCorrect(wordNormalized)) throw new Error('Enter a correct word!');

    // set word to normalized word
    setWord(wordNormalized);

    // push to words
    setData((prev) =>
      [...prev].map((el) => {
        if (el.category === category)
          return { category: el.category, words: [...el.words, wordNormalized] };
        return el;
      })
    );
  };

  const handleAddWordClick = () => {
    // add category and word to data
    try {
      addCategory();
      addWord();
    } catch (error) {
      setSnackbarData({
        open: true,
        message: error.message,
        severity: 'error',
      });
      return;
    }

    // push words to the excercise array
    setExcercise((prev) =>
      [...prev].map((object) => {
        if (object.category === category) {
          for (const wordObject of object.words) {
            if (wordObject.word === word) {
              setSnackbarData({
                open: true,
                message: 'Entered word already exists in this category!',
                severity: 'error',
              });
              return object;
            }
          }
          return {
            category: object.category,
            words: [
              ...object.words,
              {
                word: word,
                shuffled: shuffleWord(word),
              },
            ],
          };
        }
        return object;
      })
    );

    // clear input field
    setWord(null);
    // category stays
    // setCategory(null);
  };

  // create list of sorted categories
  const sortedCategories = () => data.map((el) => el.category).sort();

  // create list of sorted words in category
  const sortedWordsInCategory = () => {
    let wordsInCategory = [];
    data.forEach((el) => {
      if (el.category === category)
        // shallow copy
        wordsInCategory = el.words.slice();
    });
    return wordsInCategory.sort();
  };

  const handleAddExcerciseClick = () => {
    // push categories, words and excercise object to DB

    // data of words and categories to send
    const dataToSend = data;

    // create object to send
    const excerciseToSend = {
      // add unique id
      id: uniqid('jumbleword-'),
      // delete empty categories
      excercise: excercise.filter((object) => object.words.length > 0),
    };

    // push to DB
    console.log(dataToSend);
    console.log(excerciseToSend);

    // reset data - trigger useEffect by changing addExcerciseCount value
    setAddExcerciseCount((prev) => prev + 1);
  };

  const handleDeleteWordClick = (wordToDeleteCategory, wordToDelete) => {
    setExcercise((prev) =>
      [...prev].map((object) => {
        if (object.category === wordToDeleteCategory) {
          return {
            category: object.category,
            words: object.words.filter(
              (wordObject) => wordObject.word !== wordToDelete
            ),
          };
        }
        return object;
      })
    );
  };

  // data fetch
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();

      setData(fetchedData);

      // reset excercise
      setExcercise([]);

      // create an excercise array from categories
      fetchedData.forEach((el) => {
        setExcercise((prev) => [...prev, { category: el.category, words: [] }]);
      });
    };
    fetchData();
  }, [addExcerciseCount]);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>ENGLISHTREE - Random word</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            Random letters in a word
          </Typography>
          <Typography component="p" variant="subtitle2">
            Select or add a category and enter a word which will be shuffled and
            added to the excercise.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* ADDING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <UniversalAutocompleteSelectAdd
                handleChange={handleChangeCategory}
                handleFilter={filterAutocomplete}
                label="Category..."
                labelId="jumblewords-autocomplete-category"
                options={sortedCategories()}
                value={category}
              />
              <UniversalAutocompleteSelectAdd
                handleChange={handleChangeWord}
                handleFilter={filterAutocomplete}
                label="Word..."
                labelId="jumblewords-autocomplete-words"
                options={sortedWordsInCategory()}
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
          </Paper>
        </Grid>

        {/* SHOWING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <ShowExcercise
              data={excercise}
              handleAddExcercise={handleAddExcerciseClick}
              handleDelete={handleDeleteWordClick}
            />
          </Paper>
        </Grid>
      </Grid>
      <UniversalSnackbarAlert handleClose={handleSnackbarClose} {...snackbarData} />
    </div>
  );
};

export default JumbleWord;
