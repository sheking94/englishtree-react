import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const UniversalSnackbarAlert = ({ handleClose, message, open, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default UniversalSnackbarAlert;
