import React from 'react';

import { Helmet } from 'react-helmet';

import { Typography } from '@material-ui/core';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>ENGLISHTREE - Home</title>
      </Helmet>
      <Typography variant="h5" component="h2">
        Landing Page
      </Typography>
    </>
  );
};

export default LandingPage;
