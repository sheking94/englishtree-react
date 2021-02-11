import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

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

import ShowExcercise from './ShowExcercise/ShowExcercise';
import UniversalAutocompleteSelectAdd from '../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';

// simulate fetching data
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getData = async () => {
  await sleep(500);
  const loadedCategories = ['sport', 'family', 'animals', 'food'];
  const loadedWords = [
    'football',
    'tennis',
    'cricket',
    'swimming',
    'mother',
    'father',
    'son',
    'daughter',
    'hamburger',
    'pizza',
    'sandwich',
  ];
  return { categories: loadedCategories, words: loadedWords };
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

const JumbleWord = () => {
  const [category, setCategory] = useState(null);
  const [word, setWord] = useState(null);
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [excercise, setExcercise] = useState([]);

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

  const addCategory = () => {
    // normalize entered string
    const categoryNormalized = normalizeWord(category);

    // check if the input category already exists in categories
    if (categories.includes(categoryNormalized)) {
      // nothing to do
      return;
    }

    // check if the input category string is correct
    if (!wordIsCorrect(categoryNormalized))
      throw new Error('Enter a correct category!');

    // set category to normalized category
    setCategory(categoryNormalized);

    // push to categories array...
    setCategories((prev) => [...prev, categoryNormalized]);

    // ...and create an object in the excercise array
    setExcercise((prev) => [...prev, { category, words: [] }]);
  };

  const addWord = () => {
    // normalize entered string
    const wordNormalized = normalizeWord(word);

    // check if the input word already exists in words
    if (words.includes(wordNormalized)) {
      // nothing to do
      return;
    }

    // check if the input word string is correct
    if (!wordIsCorrect(wordNormalized)) throw new Error('Enter a correct word!');

    // set category to normalized category
    setWord(wordNormalized);

    // push to words array
    setWords((prev) => [...prev, wordNormalized]);
  };

  const handleAddWordClick = () => {
    // add category to categories
    try {
      addCategory();
      addWord();
    } catch (error) {
      // error snackbar if entered category is incorrect
      console.error(error.message);
      return;
    }

    // push words to the excercise array
    setExcercise((prev) =>
      [...prev].map((object) => {
        if (object.category === category) {
          for (const wordObject of object.words) {
            if (wordObject.word === word) {
              // error snackbar: word already exists in category
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

    // -- Clear input field
    setWord(null);
    // setCategory(null); // -- Category stays
  };

  const handleAddExcerciseClick = () => {
    // -- Push categories, words and excercise object to DB
    // -- Add unique ID to an excercise
    // ----------------------------------------------------
    // -- If success -> remount component
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const loadedCategories = data.categories;
      const loadedWords = data.words;

      // load categories and words
      setCategories(loadedCategories);
      setWords(loadedWords);

      // reset excercise
      setExcercise([]);
      // create an excercise array from categories

      loadedCategories.forEach((element) => {
        setExcercise((prev) => [...prev, { category: element, words: [] }]);
      });
    };
    fetchData();
  }, []);

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
        <Grid component="section" item lg={4} md={4} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <UniversalAutocompleteSelectAdd
                handleChange={handleChangeCategory}
                handleFilter={filterAutocomplete}
                label="Category..."
                labelId="jumblewords-autocomplete-category"
                options={categories}
                value={category}
              />
              <UniversalAutocompleteSelectAdd
                handleChange={handleChangeWord}
                handleFilter={filterAutocomplete}
                label="Word..."
                labelId="jumblewords-autocomplete-words"
                options={words}
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
        <Grid component="section" item lg={8} md={8} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <ShowExcercise data={excercise} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default JumbleWord;
