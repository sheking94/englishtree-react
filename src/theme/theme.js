import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[600],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
