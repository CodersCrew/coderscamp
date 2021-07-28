import React from 'react';
import { render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

describe('CheckboxGroup', () => {
  const textOne = 'Test One';
  const textTwo = 'Test Two';

  it('renders correctly', () => {
    render(<CheckboxGroup value={['1']} onChange={() => {}} data-testid="Checkbox" />);

    const Checkbox = screen.getByTestId('Checkbox');

    expect(Checkbox).toBeInTheDocument();
  });

  it('renders correctly checked Checkbox', () => {
    render(
      <CheckboxGroup value={['1']} onChange={() => {}}>
        <Checkbox value="1">{textOne}</Checkbox>
        <Checkbox value="2">{textTwo}</Checkbox>
      </CheckboxGroup>,
    );

    const CheckboxOne = screen.getByLabelText(textOne);
    const CheckboxTwo = screen.getByLabelText(textTwo);

    expect(CheckboxOne).toBeChecked();

    expect(CheckboxTwo).not.toBeChecked();
  });
});
