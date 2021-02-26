import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import uniqid from 'uniqid';

import { Button, List, makeStyles, Typography } from '@material-ui/core';

import {
  incrementAddExcerciseCount,
  setExcercise,
} from '../../../../../store/reducers/jumbleSentenceSlice';
import { setSnackbar } from '../../../../../store/reducers/snackbarSlice';

import Category from '../Category/Category';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ShowExcercise = () => {
  const data = useSelector((state) => state.jumbleSentence.data);
  const excercise = useSelector((state) => state.jumbleSentence.excercise);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleAddExcercise = () => {
    // push categories, sentences and excercise object to DB

    // data of sentences and categories to send
    const dataToSend = data;

    // create object to send
    const excerciseToSend = {
      // add unique id
      id: uniqid('jumblesentence-'),
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

  const categories = excerciseSorted.map(({ category, sentences }) => (
    <Category category={category} key={category} sentences={sentences} />
  ));

  return (
    <>
      {excercise.length ? (
        <div className={classes.root}>
          <List>{categories}</List>
          <Button
            color="secondary"
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
