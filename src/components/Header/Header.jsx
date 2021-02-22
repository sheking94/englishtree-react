import React, { useState } from 'react';

import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SideMenu from './subcomponents/SideMenu/SideMenu';

import '../../theme/fonts.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    background: `linear-gradient(
      45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}
      )`,
    display: 'flex',
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

            <Typography variant="h3" component="h1" className={classes.title}>
              Englishtree
            </Typography>

            <IconButton aria-label="user" color="inherit" edge="end">
              <AccountCircle fontSize="large" />
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
