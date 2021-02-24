import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';

import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';

import { setSnackbar } from '../../store/reducers/jumbleWordSlice';

import UniversalSnackbarAlert from '../universal/UniversalSnackbarAlert/UniversalSnackbarAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const JumbleWord = ({ addData, displayData, header, title }) => {
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

  return (
    <div className={classes.root}>
      <Helmet>
        <title>ENGLISHTREE - {title}</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* ADDING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>{addData}</Paper>
        </Grid>

        {/* SHOWING DATA */}
        <Grid component="section" item lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>{displayData}</Paper>
        </Grid>
      </Grid>
      <UniversalSnackbarAlert handleClose={handleSnackbarClose} {...snackbarData} />
    </div>
  );
};

export default JumbleWord;
