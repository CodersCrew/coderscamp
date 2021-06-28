import React from 'react';
import { render, screen } from '@testing-library/react';

import { Badge, largeStyleProps, smallStyleProps } from './Badge';

describe('Badge', () => {
  it('renders correctly in large size', () => {
    const text = 'Badge Text';

    render(<Badge size="large">{text}</Badge>);

    const badge = screen.getByText(text);

    expect(badge).toHaveStyle(largeStyleProps);
    expect(badge).toBeInTheDocument();
  });

  it('renders correctly in small size', () => {
    const text = 'Badge Text';

    render(<Badge size="small">{text}</Badge>);

    const badge = screen.getByText(text);

    expect(badge).toHaveStyle(smallStyleProps);
  });
});
