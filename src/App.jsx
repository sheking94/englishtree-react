import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import MaterialTheme from './theme/MaterialTheme';

import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
