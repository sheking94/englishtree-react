import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import ErrorPage from '../ErrorPage/ErrorPage';

const ExampleTeacherApp = () => (
  <Typography component="p" variant="h4">
    Something tasty for teachers will be here one day... Maybe... Or maybe not.
  </Typography>
);

const TeacherPanel = () => {
  return (
    <Router>
      <Switch>
        <Route path="/teacher/1" component={ExampleTeacherApp} exact />
        <Route path="/teacher/2" component={ExampleTeacherApp} exact />
        <Route path="/teacher/3" component={ExampleTeacherApp} exact />
        <Route path="/teacher" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default TeacherPanel;
