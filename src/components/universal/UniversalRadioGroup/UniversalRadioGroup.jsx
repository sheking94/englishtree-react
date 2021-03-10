import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
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

const UniversalRadioGroup = ({
  answers,
  correct,
  changeInput,
  changeRadio,
  header,
}) => {
  const classes = useStyles();

  const radioElements = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRTSUVWXYZ';
    if (alphabet.length < answers.length) {
      console.error('Too many elements in radio group!');
      return <Typography>Too many elements in radio group!</Typography>;
    }

    const elements = [];
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

export default UniversalRadioGroup;
