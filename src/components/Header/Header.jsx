import React, { useState } from 'react';

import {
  AppBar,
  Button,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';

import SideMenu from './subcomponents/SideMenu/SideMenu';

import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/reducers/themeSlice';
import { changeLoginState } from '../../store/reducers/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    background: `linear-gradient(
      45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}
      )`,
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Header = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const signedIn = useSelector((state) => state.auth.signedIn);
  const themeType = useSelector((state) => state.theme.type);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleMenuClick = () => {
    setMenuIsOpened(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpened(false);
  };

  const handleThemeClick = () => {
    dispatch(changeTheme());
  };

  const handleLoginChange = () => {
    dispatch(changeLoginState());
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.topBar} position="static">
        <Container disableGutters>
          <Toolbar>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              onClick={handleMenuClick}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h1" className={classes.title}>
              englishtree
            </Typography>

            <Button color="inherit" variant="outlined" onClick={handleLoginChange}>
              {signedIn ? 'Sign Out' : 'Sign In'}
            </Button>

            <IconButton
              aria-label="user"
              color="inherit"
              edge="end"
              onClick={handleThemeClick}
            >
              {themeType === 'light' ? (
                <Brightness4Icon fontSize="large" />
              ) : (
                <Brightness7Icon fontSize="large" />
              )}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        aria-label="menu-drawer"
        keepMounted
        open={menuIsOpened}
        onClose={handleMenuClose}
      >
        <SideMenu />
      </Drawer>
    </div>
  );
};

export default Header;
