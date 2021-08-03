import React from 'react';
import { render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

describe('CheckboxGroup', () => {
  const textOne = 'Test One';
  const textTwo = 'Test Two';

  it('renders correctly', () => {
    render(<CheckboxGroup value={['1']} onChange={() => {}} data-testid="Checkbox" />);

    const checkbox = screen.getByTestId('Checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  it('renders correctly checked Checkbox', () => {
    render(
      <CheckboxGroup value={['1']} onChange={() => {}}>
        <Checkbox value="1">{textOne}</Checkbox>
        <Checkbox value="2">{textTwo}</Checkbox>
      </CheckboxGroup>,
    );

    const checkboxOne = screen.getByLabelText(textOne);
    const checkboxTwo = screen.getByLabelText(textTwo);

    expect(checkboxOne).toBeChecked();

    expect(checkboxTwo).not.toBeChecked();
  });
});
