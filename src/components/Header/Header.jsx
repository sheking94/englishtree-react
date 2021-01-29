import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
}));

const Header = () => {
  const [menuElement, setMenuElement] = useState(null);

  const classes = useStyles();
  const history = useHistory();

  const handleMenuClick = (event) => {
    setMenuElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuElement(null);
  };

  const handleMenuItemClick = (url) => {
    history.push(url);
    handleMenuClose();
  };

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="main-menu"
            anchorEl={menuElement}
            keepMounted
            open={Boolean(menuElement)}
            onClose={handleMenuClose}
          >
            <nav>
              <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/student')}>
                Student's Panel
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/teacher')}>
                Teacher's Panel
              </MenuItem>
            </nav>
          </Menu>

          <Typography variant="h6" className={classes.title}>
            Englishtree
          </Typography>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
