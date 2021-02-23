import React from 'react';
import { NavLink } from 'react-router-dom';

import { List, ListItem, ListItemText } from '@material-ui/core';

const ExpandedList = ({ data, nestedClass }) => {
  const items = data.map((item) => (
    <ListItem
      button
      className={nestedClass}
      component={NavLink}
      exact
      key={item.to}
      to={item.to}
    >
      <ListItemText primary={item.text} />
    </ListItem>
  ));

  return <List disablePadding>{items}</List>;
};

export default ExpandedList;
