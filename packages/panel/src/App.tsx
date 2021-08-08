import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CalendarPage } from './screens/CalendarPage';
import { GoToFormPage } from './screens/GoToFormPage';
import { SignUpPageForCandidates } from './screens/SignUpPageForCandidates';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SignUpPageForCandidates />
          <GoToFormPage />
        </Route>
        <Route path="/kalendarz" exact>
          <CalendarPage />
        </Route>
      </Switch>
    </Router>
  );
};
