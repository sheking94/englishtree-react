import React from 'react';
import { NavLink } from 'react-router-dom';

import { Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:first-child': {
      marginTop: theme.spacing(8),
    },
  },
  menuList: {
    '&:first-child': {
      marginTop: theme.spacing(1),
    },
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  listItem: {
    gap: theme.spacing(1),
    justifyItems: 'center',
    '&.active': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  emptyListItem: {
    minHeight: theme.spacing(8),
  },
}));

const SideMenu = () => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <Divider variant="middle" />

      <List className={classes.root}>
        <ListItem
          button
          className={classes.listItem}
          component={NavLink}
          exact
          to="/"
        >
          <HomeIcon />
          <Typography component="span" variant="h6">
            Home
          </Typography>
        </ListItem>

        <ListItem
          button
          className={classes.listItem}
          component={NavLink}
          to="/student"
        >
          <SchoolIcon />
          <Typography component="span" variant="h6">
            Student's Panel
          </Typography>
        </ListItem>

        <ListItem
          button
          className={classes.listItem}
          component={NavLink}
          to="/teacher"
        >
          <PostAddIcon />
          <Typography component="span" variant="h6">
            Teacher's Panel
          </Typography>
        </ListItem>
      </List>
    </nav>
  );
};

export default SideMenu;
