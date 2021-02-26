import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import uniqid from 'uniqid';

import {
  Button,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from '@material-ui/core';

import {
  incrementAddExcerciseCount,
  setExcercise,
} from '../../../../../store/reducers/jumbleWordSlice';
import { setSnackbar } from '../../../../../store/reducers/snackbarSlice';

import Category from '../Category/Category';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  listHeader: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    fontSize: '1.2rem',
    textAlign: 'center',
  },
}));

const ShowExcercise = () => {
  const data = useSelector((state) => state.jumbleWord.data);
  const excercise = useSelector((state) => state.jumbleWord.excercise);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleAddExcercise = () => {
    // push categories, words and excercise object to DB

    // data of words and categories to send
    const dataToSend = data;

    // create object to send
    const excerciseToSend = {
      // add unique id
      id: uniqid('jumbleword-'),
      excercise: excercise,
    };

    // push to DB
    console.log(dataToSend);
    console.log(excerciseToSend);

    // display snackbar when successfully added
    dispatch(
      setSnackbar({
        open: true,
        message: 'Excercise added!',
        severity: 'success',
      })
    );

    // reset data
    dispatch(setExcercise([]));

    // trigger useEffect by changing addExcerciseCount value
    dispatch(incrementAddExcerciseCount());
  };

  const excerciseSorted = excercise
    .slice()
    .sort((a, b) => (a.category > b.category ? 1 : -1));

  const categories = excerciseSorted.map(({ category, words }) => (
    <Category category={category} key={category} words={words} />
  ));

  return (
    <>
      {excercise.length ? (
        <div className={classes.root}>
          <List
            subheader={
              <ListSubheader
                className={classes.listHeader}
                component="h3"
                disableSticky
              >
                Words in excercise
              </ListSubheader>
            }
          >
            {categories}
          </List>
          <Button
            color="primary"
            onClick={handleAddExcercise}
            size="large"
            variant="contained"
          >
            Add excercise
          </Button>
        </div>
      ) : (
        <Typography>Nothing to show, add some words...</Typography>
      )}
    </>
  );
};

export default ShowExcercise;
