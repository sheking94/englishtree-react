import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0b833d',
    },
    secondary: {
      main: '#1d7c60',
    },
    error: {
      main: red[600],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
