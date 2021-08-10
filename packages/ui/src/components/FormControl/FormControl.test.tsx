import React from 'react';
import { render, screen } from '@testing-library/react';

import { useFieldContextSize } from './FieldContext';
import { FormControl } from './FormControl';

describe('FormControl', () => {
  it('renders correctly', () => {
    render(
      <FormControl>
        <div>Form control</div>
      </FormControl>,
    );

    expect(screen.getByText('Form control')).toBeInTheDocument();
  });

  it('passes provided size through context', () => {
    let size = '';

    const Component = () => {
      size = useFieldContextSize();

      return null;
    };

    render(
      <FormControl size="lg">
        <Component />
      </FormControl>,
    );

    expect(size).toBe('lg');
  });
});
