import React, { useState } from 'react';

import {
  AppBar,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SideMenu from './SideMenu/SideMenu';

import '../../theme/fonts.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    background: `linear-gradient(
        45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}
      )`,
  },

  title: {
    flexGrow: 1,
    fontFamily: '"Caveat Brush", cursive',
    letterSpacing: theme.spacing(0.4),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

const Header = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const classes = useStyles();

  const handleMenuClick = () => {
    setMenuIsOpened(true);
  };

  const handleMenuClose = () => {
    setMenuIsOpened(false);
  };

  return (
    <header className={classes.root}>
      <AppBar className={classes.topBar} position="static">
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={handleMenuClick}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Drawer
            aria-label="menu-drawer"
            keepMounted
            open={menuIsOpened}
            onClose={handleMenuClose}
          >
            <SideMenu />
          </Drawer>

          <Typography variant="h3" component="h1" className={classes.title}>
            Englishtree
          </Typography>

          <IconButton aria-label="user" color="inherit" edge="end">
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
