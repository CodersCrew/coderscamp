import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CalendarPage } from './screens/CalendarPage';
import { Dashboard } from './screens/Dashboard';
import { GoToFormPage } from './screens/GoToFormPage';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { SignUpPageForCandidates } from './screens/SignUpPageForCandidates';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up-old" exact>
          <SignUpPageForCandidates />
          <GoToFormPage />
        </Route>
        <Route path="/kalendarz" exact>
          <CalendarPage />
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};
