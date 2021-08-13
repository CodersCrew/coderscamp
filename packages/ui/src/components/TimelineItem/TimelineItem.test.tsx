import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '../../utils/renderWithTheme';
import { TimelineItem } from './TimelineItem';

describe('TimelineItem', () => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(() => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });

  it('render component with given information', () => {
    const text = 'Lorem ipsum';

    renderWithTheme(<TimelineItem step={0} date="24.10-11.11.2021" information={text} />);

    const typography = screen.getByText(text);

    expect(typography).toBeInTheDocument();
  });

  it('render component with given date', () => {
    const date = '24.10-11.11.2021';

    renderWithTheme(<TimelineItem step={0} date={date} information="Lorem ipsum" />);

    const typography = screen.getByText(date);

    expect(typography).toBeInTheDocument();
  });

  it('render component with given step', () => {
    const step = 0;

    renderWithTheme(<TimelineItem step={step} date="24.10-11.11.2021" information="Lorem ipsum" />);

    const typography = screen.getByText(step);

    expect(typography).toBeInTheDocument();
  });
});
