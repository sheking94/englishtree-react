import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import routes from '../../routes/routes';

const MainContentRouter = () => {
  const allRoutes = routes.map(({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  ));

  return (
    <Container>
      <Switch>{allRoutes}</Switch>
    </Container>
  );
};

export default MainContentRouter;
