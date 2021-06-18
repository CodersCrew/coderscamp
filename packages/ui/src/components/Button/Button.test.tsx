import React from 'react';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('renders correctly in loading state', () => {
    const text = 'Button text';

    render(
      <Button data-testid="btn" isLoading>
        {text}
      </Button>,
    );

    const button = screen.getByTestId('btn');

    expect(button).toHaveAttribute('data-loading');
    expect(button).toBeDisabled();
    expect(screen.getByText(text)).not.toBeVisible();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders correctly in disabled state', () => {
    const text = 'Button text';

    render(<Button disabled>{text}</Button>);

    const button = screen.getByRole('button', { name: text });

    expect(button).toBeDisabled();
  });
});
