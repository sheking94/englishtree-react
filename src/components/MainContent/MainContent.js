import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../routes/routes';

const MainContentRouter = () => {
  const allRoutes = routes.map(({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  ));

  return <Switch>{allRoutes}</Switch>;
};

export default MainContentRouter;
