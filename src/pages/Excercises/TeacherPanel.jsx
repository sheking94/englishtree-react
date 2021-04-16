import React from 'react';

import { Helmet } from 'react-helmet';

import { Typography } from '@material-ui/core';

const TeacherPanel = () => {
  return (
    <>
      <Helmet>
        <title>ENGLISHTREE - Error</title>
      </Helmet>

      <Typography component="p" variant="h4">
        Something tasty for teachers will be here one day...
      </Typography>
    </>
  );
};

export default TeacherPanel;
