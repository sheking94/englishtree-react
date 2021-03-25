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
  root: {
    paddingLeft: theme.spacing(0.5),
  },
  radioInput: {
    paddingLeft: theme.spacing(0.5),
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

const RadioElements = ({ answers, changeInput, tf }) => {
  const classes = useStyles();

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

const ABCRadioGroup = ({
  answers,
  correct,
  changeInput,
  changeRadio,
  header,
  tf = false,
}) => {
  const classes = useStyles();

  return (
    <>
      {answers?.length ? (
        <FormControl className={classes.root} component="fieldset">
          <FormLabel component="legend">{header}</FormLabel>
          <RadioGroup
            aria-label="options"
            name="options"
            value={correct}
            onChange={changeRadio}
          >
            <RadioElements answers={answers} tf={tf} changeInput={changeInput} />
          </RadioGroup>
        </FormControl>
      ) : null}
    </>
  );
};

export default ABCRadioGroup;
