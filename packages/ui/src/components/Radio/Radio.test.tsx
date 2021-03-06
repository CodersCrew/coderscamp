import React from 'react';
import { render, screen } from '@testing-library/react';

import { Radio } from './Radio';

describe('Radio', () => {
  const text = 'Radio label';

  it('renders correctly in disabled state', () => {
    render(
      <Radio value="" disabled>
        {text}
      </Radio>,
    );

    expect(screen.getByLabelText(text)).toBeDisabled();
  });

  it('renders correctly in checked state', () => {
    render(
      <Radio value="" checked>
        {text}
      </Radio>,
    );

    expect(screen.getByLabelText(text)).toBeChecked();
  });
});
