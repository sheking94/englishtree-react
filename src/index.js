import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import reportWebVitals from './reportWebVitals';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';
import 'fontsource-roboto';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
