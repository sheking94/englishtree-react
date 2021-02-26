import React, { useState } from 'react';

import {
  Box,
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
import grey from '@material-ui/core/colors/grey';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import Word from '../Word/Word';

const useStyles = makeStyles((theme) => ({
  categoryName: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  tableBox: {
    borderColor: theme.palette.type === 'light' ? grey[400] : grey[700],
    borderRadius: 6,
    margin: theme.spacing(1),
  },
  tableHeader: {
    '& *': {
      fontWeight: 'bold',
    },
  },
}));

const Category = ({ category, words }) => {
  const [collapseOpen, setCollapseOpen] = useState(true);

  const classes = useStyles();

  const handleCollapseClick = () => {
    setCollapseOpen((prev) => !prev);
  };

  const wordElements = words.map(({ word, shuffled }) => (
    <Word category={category} key={word} shuffled={shuffled} word={word} />
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
        <Box border={1} className={classes.tableBox}>
          <TableContainer>
            <Table size="small">
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
        </Box>
      </Collapse>
    </li>
  );
};

export default Category;
