import React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from './index';

const getInput = () => screen.getByRole('input');

describe('Input', () => {
  it('renders correctly in default state', () => {
    render(<Input />);
    expect(getInput()).toBeEnabled();
    expect(getInput()).toBeInTheDocument();
  });
  it('render correctly in disabled state', () => {
    render(<Input disabled />);
    expect(getInput()).toBeDisabled();
  });
  it('render correctly in invalid state', () => {
    render(<Input isInvalid="true" />);
    expect(getInput()).toBeInvalid();
  });
});
