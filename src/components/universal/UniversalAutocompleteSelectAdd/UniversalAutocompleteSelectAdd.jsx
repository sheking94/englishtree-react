/* eslint-disable no-use-before-define */
import React from 'react';

import { FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab';

const filter = createFilterOptions();

const UniversalAutocompleteSelectAdd = ({
  handleChange,
  label,
  labelId,
  options,
  value,
}) => {
  const filterAutocomplete = (options, params) => {
    const filtered = filter(options, params);

    // Suggest the creation of a new value
    if (params.inputValue !== '') {
      filtered.push(params.inputValue);
    }

    return filtered;
  };

  return (
    <FormControl>
      <Autocomplete
        value={value}
        onChange={handleChange}
        filterOptions={filterAutocomplete}
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
