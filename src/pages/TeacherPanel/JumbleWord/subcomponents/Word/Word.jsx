import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { setExcerciseDeleteWord } from '../../../../../store/reducers/jumbleWordSlice';

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

const Word = ({ category, shuffled, word }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDelete = () => {
    dispatch(setExcerciseDeleteWord({ category: category, word: word }));
  };

  return (
    <TableRow>
      <TableCell>{word}</TableCell>
      <TableCell>{shuffled}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete className={classes.deleteIcon} fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Word;
