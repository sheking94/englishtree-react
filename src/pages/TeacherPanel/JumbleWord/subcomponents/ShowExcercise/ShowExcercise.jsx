import React from 'react';

import { Typography } from '@material-ui/core';

import Categories from '../Categories/Categories';

const ShowExcercise = ({ data, handleAddExcercise, handleDelete }) => {
  const isExcerciseVisible = () => {
    if (data.length) {
      let i = 0;
      data.forEach((element) => {
        if (element.words.length) ++i;
      });
      return Boolean(i);
    }
    return false;
  };

  return (
    <>
      {isExcerciseVisible() ? (
        <Categories
          data={data}
          handleAddExcercise={handleAddExcercise}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography>Nothing to show, add some words...</Typography>
      )}
    </>
  );
};

export default ShowExcercise;
