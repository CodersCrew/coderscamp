import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useIsUserAuthorized } from '@/modules/user/userHooks';

export const AuthorizedRoute = (props: RouteProps) => {
  const isAuthorized = useIsUserAuthorized();

  return isAuthorized ? <Route {...props} /> : <Redirect to="/login" />;
};

export const UnauthorizedRoute = (props: RouteProps) => {
  const isAuthorized = useIsUserAuthorized();

  return isAuthorized ? <Redirect to="/dashboard" /> : <Route {...props} />;
};

export const Redirect404 = () => {
  const isAuthorized = useIsUserAuthorized();

  return isAuthorized ? <Redirect from="/" to="/" /> : <Redirect from="/" to="/login" />;
};
