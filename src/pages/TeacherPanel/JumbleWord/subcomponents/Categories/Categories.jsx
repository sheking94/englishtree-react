import React from 'react';

import { Button, List, ListSubheader, makeStyles } from '@material-ui/core';

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

const Categories = ({ data, handleAddExcercise, handleDelete }) => {
  const classes = useStyles();

  const categories = data.map(({ category, words }) => {
    if (words.length) {
      return (
        <Category
          category={category}
          handleDelete={handleDelete}
          key={category}
          words={words}
        />
      );
    }

    return null;
  });

  return (
    <div className={classes.root}>
      <List
        subheader={
          <ListSubheader className={classes.listHeader} component="h3" disableSticky>
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
        Add to excercise
      </Button>
    </div>
  );
};

export default Categories;
