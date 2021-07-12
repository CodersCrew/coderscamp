import React from 'react';
import { render, screen } from '@testing-library/react';

import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('renders correctly in not disabled mode', () => {
    render(<NumberInput size="lg" aria-label="inputNumber" />);

    const numberInput = screen.getByLabelText('inputNumber');

    expect(numberInput).toBeEnabled();
    expect(numberInput).toBeInTheDocument();
  });

  it('renders correctly in disabled mode', () => {
    render(<NumberInput size="lg" disabled aria-label="inputNumber" />);

    const numberInput = screen.getByLabelText('inputNumber');

    expect(numberInput).toBeDisabled();
    expect(numberInput).toBeInTheDocument();
  });
});
