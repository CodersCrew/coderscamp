import React from 'react';
import { render, screen } from '@testing-library/react';

import { Textarea } from './index';

const getTextarea = () => screen.getByRole('textbox');

describe('Textarea', () => {
  it('Renders correctly in disabled state', () => {
    render(<Textarea disabled />);
    expect(getTextarea()).toBeDisabled();
  });

  it('Renders correctly as default textarea', () => {
    render(<Textarea />);
    expect(getTextarea()).toBeEnabled();
    expect(getTextarea()).toBeInTheDocument();
  });

  it('Renders correctly in invalid state', () => {
    render(<Textarea invalid />);
    expect(getTextarea()).toBeInvalid();
  });
});
