import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { setExcerciseDeleteSentence } from '../../../../../store/reducers/jumbleSentenceSlice';

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

const Sentence = ({ category, shuffled, sentence }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDelete = () => {
    dispatch(setExcerciseDeleteSentence({ category: category, sentence: sentence }));
  };

  return (
    <TableRow>
      <TableCell>{sentence}</TableCell>
      <TableCell>{shuffled}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete className={classes.deleteIcon} fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Sentence;
