import React from 'react';
import { render, screen } from '@testing-library/react';

import { Textarea } from './index';

describe('Textarea', () => {
  it('Renders correctly in disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });
});
