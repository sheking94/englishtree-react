/* eslint-disable no-use-before-define */
import React from 'react';

import { FormControl, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
}));

const UniversalAutocompleteSelectAdd = ({
  handleChange,
  handleFilter,
  label,
  labelId,
  options,
  value,
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        value={value}
        onChange={handleChange}
        filterOptions={handleFilter}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id={labelId}
        options={options}
        getOptionLabel={(option) => {
          if (option.inputValue) {
            return option.inputValue;
          }
          return option;
        }}
        renderOption={(option) => option}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </FormControl>
  );
};

export default UniversalAutocompleteSelectAdd;
