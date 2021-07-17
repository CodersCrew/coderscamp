import React from 'react';
import { render, screen } from '@testing-library/react';

import { Radio } from '../Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  const textOne = 'One';
  const textTwo = 'Two';

  it('renders correctly', () => {
    render(<RadioGroup name="test" value="1" onChange={() => {}} data-testid="radio" />);

    const radio = screen.getByTestId('radio');

    expect(radio).toBeInTheDocument();
  });

  it('renders correctly checked radio', () => {
    render(
      <RadioGroup name="test" value="1" onChange={() => {}}>
        <Radio value="1">{textOne}</Radio>
        <Radio value="2">{textTwo}</Radio>
      </RadioGroup>,
    );

    const radioOne = screen.getByLabelText(textOne);
    const radioTwo = screen.getByLabelText(textTwo);

    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
  });
});
