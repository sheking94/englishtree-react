import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';

const themeType = 'light';

let theme = createMuiTheme({
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

theme = responsiveFontSizes(theme);

export default theme;
