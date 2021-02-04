import React from 'react';

import { Helmet } from 'react-helmet';

import { Typography } from '@material-ui/core';

const StudentPanel = () => {
  return (
    <>
      <Helmet>
        <title>ENGLISHTREE - Student's Panel</title>
      </Helmet>

      <Typography component="p" variant="h4">
        Something awfull for students will definitely be here one day!
      </Typography>
    </>
  );
};

export default StudentPanel;
