import React from 'react';
import { render, screen } from '@testing-library/react';

import { Logo } from './Logo';

describe('Logo', () => {
  it('displays correct alt text', () => {
    render(<Logo />);

    const logo = screen.getByRole('img');

    expect(logo).toHaveAttribute('alt', 'Logo CodersCamp');
  });
});
