import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@coderscamp/ui';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
