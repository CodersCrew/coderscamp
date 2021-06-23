import React from 'react';
import { render, screen } from '@testing-library/react';

import { Badge, largeStyleProps, smallStyleProps } from './Badge';

describe('Badge', () => {
  it('renders correctly in large size', () => {
    const text = 'Badge Text';

    render(
      <Badge data-testid="badge" size="large">
        {text}
      </Badge>,
    );

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveStyle(largeStyleProps);
    expect(screen.getByText(text)).toBeVisible();
  });

  it('renders correctly in small size', () => {
    const text = 'Badge Text';

    render(
      <Badge data-testid="badge" size="small">
        {text}
      </Badge>,
    );

    const badge = screen.getByTestId('badge');

    expect(badge).toHaveStyle(smallStyleProps);
  });
});
