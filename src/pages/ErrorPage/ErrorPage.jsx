import React from 'react';

import { Helmet } from 'react-helmet';

import { Typography } from '@material-ui/core';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>ENGLISHTREE - Error</title>
      </Helmet>

      <Typography variant="h3" component="h2">
        Something went wrong...
      </Typography>
    </>
  );
};

export default ErrorPage;
