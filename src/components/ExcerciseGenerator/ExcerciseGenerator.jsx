import React from 'react';

import { Helmet } from 'react-helmet';

import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';

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
  const classes = useStyles();

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
    </div>
  );
};

export default JumbleWord;
