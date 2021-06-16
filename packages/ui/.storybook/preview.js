import React from 'react';

import { ThemeProvider } from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withTheme = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export const decorators = [withTheme];
