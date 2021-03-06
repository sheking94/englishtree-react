import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ExpandedList from '../ExpandedList/ExpandedList';

import { menuItemsTeacher } from './menuItems';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:first-child': {
      marginTop: theme.spacing(8), // Maybe replace with logo
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    minWidth: 300,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&.active': {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.main,
    },
  },
  listItemIcon: {
    color: 'inherit',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    '&.active': {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.main,
    },
  },
}));

const SideMenu = () => {
  const [excerciseListExpanded, setExcerciseListExpanded] = useState(true);

  const classes = useStyles();

  const handleTeacherClick = () => {
    setExcerciseListExpanded(!excerciseListExpanded);
  };

  return (
    <nav className={classes.root}>
      <Divider className={classes.divider} variant="middle" />

      <List className={classes.list}>
        <ListItem
          button
          className={classes.listItem}
          component={NavLink}
          exact
          to="/"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={handleTeacherClick}>
          <ListItemIcon className={classes.listItemIcon}>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Excercises" />
          {excerciseListExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={excerciseListExpanded} timeout="auto" unmountOnExit>
          <ExpandedList data={menuItemsTeacher} nestedClass={classes.nested} />
        </Collapse>
      </List>
    </nav>
  );
};

export default SideMenu;
