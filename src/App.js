import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StudentPanel from './components/StudentPanel/StudentPanel';
import TeacherPanel from './components/TeacherPanel/TeacherPanel';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/student" component={StudentPanel} exact />
        <Route path="/teacher" component={TeacherPanel} exact />
        <Route component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
