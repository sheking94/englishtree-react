import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';

import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { shuffleArray } from '../../../logic/arrayLogic';
import { normalizeWord, wordIsCorrect } from '../../../logic/wordLogic';

import UniversalSelect from '../../../components/universal/UniversalSelect/UniversalSelect';
import UniversalAutocompleteSelectAdd from '../../../components/universal/UniversalAutocompleteSelectAdd/UniversalAutocompleteSelectAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
  titleDivider: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #eee',
    padding: theme.spacing(2),
    flexDirection: 'column',
    '& > *': {
      flexGrow: 1,
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState('');
  const [addedWord, setAddedWord] = useState('');
  const [addedCategory, setAddedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [excercise, setExcercise] = useState([]);

  const classes = useStyles();

  // const handleChangeCategory = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  const handleChangeCategory = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setCategory(newValue.inputValue);
    } else {
      setCategory(newValue);
    }
  };

  const filterCategories = (options, params) => {
    const filtered = filter(options, params);

    // Suggest the creation of a new value
    if (params.inputValue !== '') {
      filtered.push(params.inputValue);
    }

    return filtered;
  };

  const resetData = () => {
    // load data from API
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

    // load categories and words
    setCategories(loadedCategories);
    setWords(loadedWords);

    // reset excercise
    setExcercise([]);
    // create an excercise array from categories
    categories.forEach((category) => {
      setExcercise((prev) => [...prev, { category, words: [] }]);
    });
  };

  const handleAddCategory = () => {
    const category = normalizeWord(addedCategory);

    // -- Check if the input category string is correct
    if (!wordIsCorrect(category)) {
      // this.danger('Enter a correct category!');
      return;
    }

    // -- Check if the input category already exists
    if (categories.includes(category)) {
      // this.danger('Entered category already exists!');
      return;
    }

    // -- Push to categories array...
    setCategories((prev) => [...prev, category]);

    // -- ...and create an object in the excercise array
    setExcercise((prev) => [...prev, { category, words: [] }]);

    // -- Clear input field
    setAddedCategory('');

    // -- Set selectedCategory
    setSelectedCategory(category);
  };

  const handleAddWord = () => {
    // -- Normalize word
    const word = normalizeWord(addedWord);

    // -- Check if the input word string is correct
    if (!wordIsCorrect(word)) {
      // this.danger('Enter a correct word!');
      return;
    }

    // -- Check if a category is selected
    if (selectedCategory === '') {
      // this.danger('Choose a category!');
      return;
    }

    // -- Add to words
    if (!words.includes(word)) setWords((prev) => [...prev, word]);

    // -- Push words to the excercise array
    setExcercise((prev) =>
      [...prev].map((object) => {
        if (object.category === selectedCategory) {
          if (object.words.includes(word)) {
            // error snackbar: word already exists in category
            return object;
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
    setAddedWord('');
    // setSelectedCategory(''); // -- Category stays
  };

  const handleAddExcercise = () => {
    // -- Push categories, words and excercise object to DB
    // -- Add unique ID to an excercise
    // ----------------------------------------------------
    // -- If success -> remount component
    resetData();
  };

  useEffect(() => {
    resetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>ENGLISHTREE - Random word</title>
      </Helmet>

      <Container>
        <Typography component="h2" variant="h4">
          Random letters in a word
        </Typography>
        <Typography component="p" gutterBottom variant="subtitle2">
          Select or add a category and enter a word which will be shuffled and added
          to the excercise.
        </Typography>
      </Container>

      <Divider className={classes.titleDivider} />

      <Grid container spacing={2}>
        {/* ADDING DATA */}
        <Grid component="section" item xs={4}>
          <Paper className={classes.paper}>
            {/* <CategorySelect
              handleChange={handleChangeCategory}
              items={categories}
              label="Select a category..."
              labelId="category"
              value={selectedCategory}
            /> */}
            <UniversalAutocompleteSelectAdd
              handleChange={handleChangeCategory}
              handleFilter={filterCategories}
              label="Choose a category..."
              labelId="jumblewords-autocomplete-category"
              options={categories}
              value={category}
            />
          </Paper>
        </Grid>

        {/* SHOWING DATA */}
        <Grid component="section" item xs={8}>
          <Paper className={classes.paper}>
            <span>Jumble word show excercise</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              expedita quia iusto, ab amet debitis. Atque repellat debitis vitae
              dignissimos facere blanditiis ullam aliquid quasi itaque natus, rerum
              possimus dolore voluptatum quia nisi reprehenderit velit perferendis
              fuga a distinctio, modi asperiores iste rem. Suscipit exercitationem
              provident at quae, quasi laudantium id veritatis quia obcaecati
              laboriosam sint debitis doloremque ratione. Debitis autem, earum est
              quod reiciendis dolore quas vitae facilis excepturi vero voluptas eius
              officiis, nihil modi? Quidem dolorem non nihil consequatur sequi
              quibusdam quaerat! Accusamus laudantium adipisci voluptas repellat in,
              sit optio voluptatum minima accusantium, deleniti, illum atque nihil
              quia. Earum officia sequi maxime reprehenderit mollitia ea placeat,
              consequuntur nemo, laudantium assumenda illo dicta consequatur optio
              quos dolore dolorem excepturi quae cupiditate ipsam quod impedit, eaque
              labore ullam modi. Unde mollitia maxime aut possimus dicta velit,
              quibusdam, temporibus incidunt exercitationem accusantium accusamus
              quis molestias libero cupiditate quisquam labore excepturi eligendi
              aspernatur perferendis ad, quaerat culpa! Quam suscipit quaerat
              deleniti, dignissimos obcaecati, aliquam excepturi sequi quod aut, sed
              iusto magni qui odio aperiam voluptate praesentium. Explicabo voluptate
              quia eligendi autem nulla, molestiae molestias blanditiis dicta sunt
              minima numquam. Labore illum reprehenderit nam repudiandae, distinctio
              dicta velit ipsum veniam neque doloremque. Eaque corrupti ipsa
              veritatis voluptas explicabo reiciendis, maiores quia sint, dolor
              recusandae modi perferendis saepe odit fuga consequuntur ducimus natus
              non itaque exercitationem inventore mollitia vero repudiandae illum
              ipsum! Maxime atque quisquam modi quam similique voluptate molestiae
              sed perferendis enim, eaque fugiat nostrum dignissimos alias dolorum
              nulla tenetur temporibus eius esse consequuntur dolores tempore
              voluptates, eos omnis numquam! Totam nobis nam praesentium
              exercitationem nostrum enim quod fugit eaque accusamus laborum
              inventore ea eius, sit blanditiis cumque explicabo soluta similique
              placeat quidem est vero maxime! Impedit molestiae repellendus
              voluptatem non amet facilis dicta inventore dolores voluptas? Est quae
              ut itaque exercitationem. Quidem quia debitis a, harum repellat commodi
              officia veritatis delectus, vitae nisi eveniet magnam dignissimos
              obcaecati qui eum atque ducimus quis neque provident deleniti eligendi.
              Eveniet dolore voluptates sequi adipisci autem doloremque nemo, vero
              sed. Saepe quisquam, voluptatum delectus, eos dolorem, sed et error
              quam quae maxime repudiandae ullam! Vitae blanditiis iure doloremque
              non cupiditate vel saepe? Obcaecati, dicta consequuntur tenetur,
              architecto consequatur voluptatum id, explicabo nesciunt nostrum
              blanditiis ex corrupti ullam! Nihil, optio quas, possimus aliquam
              voluptatum nostrum blanditiis reiciendis magni itaque praesentium sit
              necessitatibus ex, obcaecati nemo? Temporibus, et dolores ipsa maiores
              voluptas minus distinctio incidunt veritatis eum amet.
            </p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default JumbleWord;
