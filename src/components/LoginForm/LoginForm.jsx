import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signIn } from '../../store/reducers/authSlice';
import { setSnackbar } from '../../store/reducers/snackbarSlice';

// login simulation
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    marginTop: theme.spacing(20),
    textAlign: 'center',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  button: {
    minWidth: 100,
    marginTop: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginPending, setLoginPending] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleLoginClick = async () => {
    setLoginPending(true);
    await sleep(3000);
    if (login === 'q' && password === 'q') {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Successfully signed in!',
          severity: 'success',
        })
      );
      setLogin('');
      setPassword('');
      setLoginPending(false);

      dispatch(signIn()); // <- this unmounts the component
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Wrong login or password!',
          severity: 'error',
        })
      );
      setLoginPending(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid className={classes.root} item xs={12}>
        <Typography component="h3" gutterBottom variant="subtitle1">
          Sign in to your teacher account:
        </Typography>
        <Divider className={classes.divider} />
        <form>
          <TextField
            className={classes.textField}
            id="teacher-login-input"
            label="Login"
            type="text"
            variant="outlined"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            className={classes.textField}
            id="teacher-password-input"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            color="primary"
            disabled={loginPending}
            size="large"
            variant="contained"
            onClick={handleLoginClick}
          >
            {loginPending ? (
              <CircularProgress color="inherit" size={26} />
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
