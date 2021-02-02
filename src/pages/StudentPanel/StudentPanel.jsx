import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import ErrorPage from '../ErrorPage/ErrorPage';

const ExampleStudentApp = () => (
  <Typography component="p" variant="h4">
    Something awfull for students will definitely be here one day!
  </Typography>
);

const TeacherPanel = () => {
  return (
    <Router>
      <Switch>
        <Route path="/student/1" component={ExampleStudentApp} exact />
        <Route path="/student/2" component={ExampleStudentApp} exact />
        <Route path="/student/3" component={ExampleStudentApp} exact />
        <Route path="/student" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default TeacherPanel;
