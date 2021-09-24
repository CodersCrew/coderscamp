import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AuthorizedRoute, Redirect404, UnauthorizedRoute } from './components/RoutingAuth';
import { WaitForUser } from './components/WaitForUser';
import { CalendarPage } from './screens/CalendarPage';
import { Dashboard } from './screens/Dashboard';
import { GoToFormPage } from './screens/GoToFormPage';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { SignUpPageForCandidates } from './screens/SignUpPageForCandidates';

export const App = () => {
  return (
    <WaitForUser>
      <BrowserRouter>
        <Switch>
          <UnauthorizedRoute exact path="/sign-up-old">
            <SignUpPageForCandidates />
            <GoToFormPage />
          </UnauthorizedRoute>
          <UnauthorizedRoute exact path="/register" component={Register} />
          <UnauthorizedRoute exact path="/login" component={Login} />
          <Layout>
            <AuthorizedRoute exact path="/calendar" component={CalendarPage} />
            <AuthorizedRoute exact path="/dashboard" component={Dashboard} />
          </Layout>
          <Redirect404 />
        </Switch>
      </BrowserRouter>
    </WaitForUser>
  );
};
