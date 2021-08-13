import { ReactElement } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { ThemeProvider } from '../theme';

export const renderWithTheme = (ui: ReactElement, options: Omit<RenderOptions, 'queries'> = {}): RenderResult => {
  return render(ui, { wrapper: ThemeProvider, ...options });
};
