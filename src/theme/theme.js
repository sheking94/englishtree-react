import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const themeType = 'light';

let theme = createMuiTheme({
  palette: {
    type: themeType,
    primary: {
      main: '#ce4116',
    },
    secondary: {
      main: '#e03131',
    },
    error: {
      main: red[600],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
