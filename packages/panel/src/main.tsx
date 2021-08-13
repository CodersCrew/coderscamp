import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider globalStyles={{ 'html, body': { backgroundColor: 'gray.100' } }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
