import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const UniversalSelect = ({ handleChange, items, label, labelId, value }) => {
  const selectItems = items.map((item) => (
    <MenuItem key={item} value={item}>
      {item.slice(0, 1).toUpperCase() + item.slice(1)}
    </MenuItem>
  ));

  return (
    <FormControl variant="outlined">
      <InputLabel id={`select-input-label-${labelId}`}>{label}</InputLabel>
      <Select
        labelId={`select-input-label-${labelId}`}
        id={`select-input-${labelId}`}
        value={value}
        onChange={handleChange}
        label={label}
      >
        {selectItems}
      </Select>
    </FormControl>
  );
};

export default UniversalSelect;
