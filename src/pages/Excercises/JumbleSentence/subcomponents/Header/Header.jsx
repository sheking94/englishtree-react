import React from 'react';

import { Typography } from '@material-ui/core';

const Header = () => {
  return (
    <>
      <Typography component="h2" variant="h4">
        Random words in a sentence
      </Typography>
      <Typography component="p" variant="subtitle2">
        Select or add a category and enter a sentence which will be shuffled and
        added to the excercise.
      </Typography>
    </>
  );
};

export default Header;
