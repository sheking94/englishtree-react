import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';

import Categories from '../Categories/Categories';

const ShowExcercise = () => {
  const excercise = useSelector((state) => state.jumbleWord.excercise);

  const isExcerciseVisible = () => {
    if (excercise.length) {
      // check all elements' words array length, return true if there is at least one not empty category
      for (const el of excercise) {
        if (el.words.length) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  return (
    <>
      {isExcerciseVisible() ? (
        <Categories />
      ) : (
        <Typography>Nothing to show, add some words...</Typography>
      )}
    </>
  );
};

export default ShowExcercise;
