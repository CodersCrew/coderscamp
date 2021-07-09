import React from 'react';
import { render, screen } from '@testing-library/react';

import { Label } from './Label';

const text = 'Label';
describe('Label', () => {
  it('renders correctly', () => {
    render(<Label size="md">{text}</Label>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it('should display asterisk when required props is true', () => {
    render(
      <Label size="md" required>
        {text}
      </Label>,
    );

    expect(screen.getByText(/Label/)).toHaveTextContent(/Label */);
  });
});
