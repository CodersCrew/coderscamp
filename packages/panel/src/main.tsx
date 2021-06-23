import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { App } from './App';
import SignUpPageForCandidates from './SignUpPageForCandidates/SignUpPageForCandidates';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* <App /> */}
      <SignUpPageForCandidates />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
