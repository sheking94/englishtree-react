import React, { useState } from 'react';

import {
  Collapse,
  ListItem,
  ListItemText,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import Word from './Word/Word';

const useStyles = makeStyles((theme) => ({
  categoryName: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  table: {
    marginBottom: theme.spacing(2),
  },
  tableHeader: {
    '& *': {
      fontWeight: 'bold',
    },
  },
}));

const Category = ({ category, handleDelete, words }) => {
  const [collapseOpen, setCollapseOpen] = useState(true);

  const classes = useStyles();

  const handleCollapseClick = () => {
    setCollapseOpen((prev) => !prev);
  };

  const wordElements = words.map(({ word, shuffled }) => (
    <Word
      category={category}
      handleDelete={handleDelete}
      key={word}
      shuffled={shuffled}
      word={word}
    />
  ));

  return (
    <li>
      <ListItem
        className={classes.categoryName}
        button
        onClick={handleCollapseClick}
      >
        <ListItemText
          primary={category.slice(0, 1).toUpperCase() + category.slice(1)}
        />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <TableContainer>
          <Table className={classes.table} size="small">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Word</TableCell>
                <TableCell>Shuffled word</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{wordElements}</TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </li>
  );
};

export default Category;
