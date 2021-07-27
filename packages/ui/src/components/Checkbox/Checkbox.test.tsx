import React from 'react';
import { render, screen } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  it('renders correctly', () => {
    render(<Checkbox value="test" onChange={() => {}} checked aria-label="checkbox" />);

    const checkbox = screen.getByLabelText('checkbox');

    expect(checkbox).toBeInTheDocument();
  });
  it('checks that checked checkbox is checked', () => {
    render(<Checkbox value="test" onChange={() => {}} checked aria-label="checkbox" />);

    const checkbox = screen.getByLabelText('checkbox');

    expect(checkbox).toBeChecked();
  });
  it('checks checkbox displays correct labels', () => {
    const label = 'checkbox name';
    render(
      <Checkbox value="test" onChange={() => {}} checked>
        {label}
      </Checkbox>,
    );

    const checkbox = screen.getByLabelText(label);

    expect(checkbox).toBeInTheDocument();
  });
});
