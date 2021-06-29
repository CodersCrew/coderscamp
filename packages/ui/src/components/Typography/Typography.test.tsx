
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Typography } from './Typography';

describe('Typography', () => {
  it('test component render properly', () => {
    const text = 'Lorem ipsum';
    render(<Typography size="xl">{text}</Typography>);
    const typography = screen.getByText(text);
    expect(typography).toBeInTheDocument();
  });
});