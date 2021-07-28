import React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from './Input';

const getInput = () => screen.getByTestId('input');

describe('Input', () => {
  it('renders correctly in default state', () => {
    render(<Input data-testid="input" />);
    expect(getInput()).toBeEnabled();
    expect(getInput()).toBeInTheDocument();
  });

  it('render correctly in disabled state', () => {
    render(<Input disabled data-testid="input" />);
    expect(getInput()).toBeDisabled();
  });

  it('render correctly in invalid state', () => {
    render(<Input isInvalid="true" data-testid="input" />);
    expect(getInput()).toBeInvalid();
  });
});
