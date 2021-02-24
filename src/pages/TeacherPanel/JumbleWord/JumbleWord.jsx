import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';

import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';

import store from '../../../store/store';
import {
  setData,
  setExcercise,
  setExcerciseEmptyCategory,
  setSnackbar,
} from '../../../store/reducers/jumbleWordSlice';

import UniversalSnackbarAlert from '../../../components/universal/UniversalSnackbarAlert/UniversalSnackbarAlert';
import Header from './subcomponents/Header/Header';
import ShowExcercise from './subcomponents/ShowExcercise/ShowExcercise';
import AddWord from './subcomponents/AddWord/AddWord';

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
}));

const JumbleWord = () => {
  const addExcerciseCount = useSelector(
    (state) => state.jumbleWord.addExcerciseCount
  );
  const snackbarData = useSelector((state) => state.jumbleWord.snackbarData);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
      setSnackbar({
        open: false,
      })
    );
  };

  // data fetch
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();

      dispatch(setData(fetchedData));

      // reset excercise
      dispatch(setExcercise([]));

      // create an excercise array from categories
      fetchedData.forEach((el) => {
        dispatch(setExcerciseEmptyCategory(el.category));
      });
    };
    fetchData();
  }, [addExcerciseCount, dispatch]);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>ENGLISHTREE - Random word</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* ADDING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <AddWord />
          </Paper>
        </Grid>

        {/* SHOWING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            <ShowExcercise />
          </Paper>
        </Grid>
      </Grid>
      <UniversalSnackbarAlert handleClose={handleSnackbarClose} {...snackbarData} />
    </div>
  );
};

export default JumbleWord;
