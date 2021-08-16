/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from './theme';

export const withExpectedError =
  <Args extends unknown[], Result>(fc: (...args: Args) => Result) =>
  (...args: Args): Result => {
    const err = console.error;

    console.error = jest.fn();

    const result = fc(...args);

    console.error = err;

    return result;
  };

const withTheme = <Render extends typeof render>(renderFc: Render) =>
  ((...args: Parameters<Render>) => {
    const [ui, options] = args;

    return renderFc(<ThemeProvider>{ui}</ThemeProvider>, options);
  }) as Render;

export const renderWithTheme = withTheme(render);
