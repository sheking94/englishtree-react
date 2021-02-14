import React from 'react';

import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  deleteIcon: {
    color: 'inherit',
  },
}));

const Word = ({ category, handleDelete, shuffled, word }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{word}</TableCell>
      <TableCell>{shuffled}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" onClick={() => handleDelete(category, word)}>
          <Delete className={classes.deleteIcon} fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Word;
