import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { App } from './App';
import { createStore } from './services/store';

const main = async () => {
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser');

    worker.start();
  }

  const store = createStore();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider globalStyles={{ 'html, body': { backgroundColor: 'gray.100' } }}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

main();
