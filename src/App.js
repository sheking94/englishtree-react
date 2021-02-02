import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import StudentPanel from './pages/StudentPanel/StudentPanel';
import TeacherPanel from './pages/TeacherPanel/TeacherPanel';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/student" component={StudentPanel} />
        <Route path="/teacher" component={TeacherPanel} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default App;
