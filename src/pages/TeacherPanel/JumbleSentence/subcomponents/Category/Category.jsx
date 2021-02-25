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
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import Sentence from '../Sentence/Sentence';

const useStyles = makeStyles((theme) => ({
  categoryName: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  tableBox: {
    margin: theme.spacing(1),
  },
  tableHeader: {
    '& *': {
      fontWeight: 'bold',
    },
  },
}));

const Category = ({ category, sentences }) => {
  const [collapseOpen, setCollapseOpen] = useState(true);

  const classes = useStyles();

  const handleCollapseClick = () => {
    setCollapseOpen((prev) => !prev);
  };

  const sentenceElements = sentences.map(({ sentence, shuffled }) => (
    <Sentence
      category={category}
      key={sentence}
      shuffled={shuffled}
      sentence={sentence}
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
        <Box
          border={1}
          borderBottom={0}
          borderColor="grey.300"
          className={classes.tableBox}
        >
          <TableContainer>
            <Table size="small">
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell>Sentence</TableCell>
                  <TableCell>Shuffled sentence</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{sentenceElements}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Collapse>
    </li>
  );
};

export default Category;
