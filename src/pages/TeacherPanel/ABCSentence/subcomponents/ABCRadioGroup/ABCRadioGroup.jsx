import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  radioInput: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flexGrow: 1,
    maxWidth: '85%',
  },
}));

const ABCRadioGroup = ({
  answers,
  correct,
  changeInput,
  changeRadio,
  header,
  tf = false,
}) => {
  const classes = useStyles();

  const radioElements = () => {
    const elements = [];

    if (tf) {
      elements.push(
        <div key={0} className={classes.radioInput}>
          <FormControlLabel
            value={0}
            label="TRUE"
            control={<Radio color="primary" />}
          />
        </div>
      );
      elements.push(
        <div key={1} className={classes.radioInput}>
          <FormControlLabel
            value={1}
            label="FALSE"
            control={<Radio color="primary" />}
          />
        </div>
      );

      return elements;
    }

    const alphabet = 'ABCD';
    answers.forEach((el, i) => {
      elements.push(
        <div key={i} className={classes.radioInput}>
          <FormControlLabel
            value={i}
            label={alphabet[i] + ')'}
            control={<Radio color="primary" />}
          />
          <TextField
            className={classes.input}
            id={'radioinput-' + i.toString()}
            variant="outlined"
            value={el}
            onChange={changeInput}
          />
        </div>
      );
    });
    return elements;
  };

  return (
    <>
      {answers?.length ? (
        <FormControl component="fieldset">
          <FormLabel component="legend">{header}</FormLabel>
          <RadioGroup
            aria-label="options"
            name="options"
            value={correct}
            onChange={changeRadio}
          >
            {radioElements()}
          </RadioGroup>
        </FormControl>
      ) : null}
    </>
  );
};

export default ABCRadioGroup;
