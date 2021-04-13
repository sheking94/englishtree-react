import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Typography } from '@material-ui/core';

import routes from '../../routes/routes';

const MainContentRouter = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);

  const allRoutes = routes.map(({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  ));

  return (
    <Container>
      <Switch>{signedIn ? allRoutes : <Typography>LOGIN PAGE</Typography>}</Switch>
    </Container>
  );
};

export default MainContentRouter;
