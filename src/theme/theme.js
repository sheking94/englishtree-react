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
      light: '#33a750',
      main: '#1b7e34',
      dark: '#135a25',
    },
    secondary: {
      main: '#135a45',
    },
    error: {
      main: red[600],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
