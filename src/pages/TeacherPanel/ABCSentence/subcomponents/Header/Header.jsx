import React from 'react';

import { Typography } from '@material-ui/core';

const Header = () => {
  return (
    <>
      <Typography component="h2" variant="h4">
        Multiple choice
      </Typography>
      <Typography component="p" variant="subtitle2">
        Select or add a category and enter a sentence with blank (use low dash sign
        "_" for that). Then enter answers and choose the right one. The sentence with
        answers will be added to the excercise.
      </Typography>
    </>
  );
};

export default Header;
