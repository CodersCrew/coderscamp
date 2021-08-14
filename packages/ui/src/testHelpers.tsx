/* eslint-disable no-console */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Queries, queries, render, RenderOptions, RenderResult } from '@testing-library/react';

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

export const renderWithTheme = <
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
>(
  ui: React.ReactElement,
  options: RenderOptions<Q, Container> = {},
): RenderResult<Q, Container> => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
};
