import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import MainContentRouter from './components/MainContent/MainContentRouter';

const App = () => {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <MainContentRouter />
      </main>
    </Router>
  );
};

export default App;
