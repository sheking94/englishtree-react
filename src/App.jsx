import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTheme from './theme/MaterialTheme';

import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import UniversalSnackbarAlert from './components/universal/UniversalSnackbarAlert/UniversalSnackbarAlert';

import { setSnackbar } from './store/reducers/snackbarSlice';

const App = () => {
  const snackbarData = useSelector((state) => state.snackbar.snackbarData);

  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
      setSnackbar({
        open: false,
      })
    );
  };

  return (
    <MaterialTheme>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <MainContent />
        </main>
        <UniversalSnackbarAlert
          handleClose={handleSnackbarClose}
          {...snackbarData}
        />
      </Router>
    </MaterialTheme>
  );
};

export default App;
