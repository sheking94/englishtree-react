import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

const App = () => {
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <MainContent />
      </main>
    </Router>
  );
};

export default App;
