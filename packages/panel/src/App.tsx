import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CalendarPage } from './Calendar';
import { GoToFormPage } from './GoToFormPage';
import { SignUpPageForCandidates } from './SignUpPageForCandidates';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SignUpPageForCandidates />
          <GoToFormPage />
        </Route>
        <Route path="/calendar" exact>
          <CalendarPage />
        </Route>
      </Switch>
    </Router>
  );
};
