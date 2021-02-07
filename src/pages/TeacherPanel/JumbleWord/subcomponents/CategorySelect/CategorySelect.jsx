import React from 'react';

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
}));

const CategorySelect = ({ handleChange, items, label, labelId, value }) => {
  const classes = useStyles();

  const selectItems = items.map((item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ));

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`select-input-label-${labelId}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-label-${labelId}`}
        id={`select-input-${labelId}`}
        value={value}
        onChange={handleChange}
      >
        {selectItems}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
