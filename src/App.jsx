import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MaterialTheme from './theme/MaterialTheme';

import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  return (
    <MaterialTheme>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <MainContent />
        </main>
      </Router>
    </MaterialTheme>
  );
};

export default App;
