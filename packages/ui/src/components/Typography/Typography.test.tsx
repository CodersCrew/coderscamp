import React from 'react';
import { render, screen } from '@testing-library/react';

import { Typography } from './Typography';

describe('Typography', () => {
  it('test component render properly', () => {
    const text = 'Lorem ipsum';

    render(<Typography size="xl">{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography).toBeInTheDocument();
  });

  it('should have styles "textDecoration=underline "and "color=brand.500" when receive "as" props equal to "a"', () => {
    const text = 'Lorem ipsum';

    render(
      <Typography size="xl" as="a" href="#">
        {text}
      </Typography>,
    );

    const typography = screen.getByText(text);

    expect(typography).toHaveStyle({
      textDecoration: 'underline',
      color: 'brand.500',
    });
  });
});
