import React from 'react';
import { useSelector } from 'react-redux';

import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';

import 'fontsource-roboto';

const theme = (themeType) => {
  let createdTheme = createMuiTheme({
    palette: {
      type: themeType,
      primary: {
        main: '#ef6c00',
      },
      secondary: {
        main: '#7cb342',
      },
    },
  });
  createdTheme = responsiveFontSizes(createdTheme);
  return createdTheme;
};

const MaterialTheme = ({ children }) => {
  const themeType = useSelector((state) => state.theme.type);

  return (
    <ThemeProvider theme={theme(themeType)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MaterialTheme;
