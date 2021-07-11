import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { App } from './App';
import { GoToFormPage } from './GoToFormPage/GoToFormPage';
import { SignUpPageForCandidates } from './SignUpPageForCandidates/SignUpPageForCandidates';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <SignUpPageForCandidates />
      <GoToFormPage />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
