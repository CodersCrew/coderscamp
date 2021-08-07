import React from 'react';
import { render, screen } from '@testing-library/react';

import { HelperText } from './HelperText';

describe('HelperText', () => {
  it('renders correctly', () => {
    const text = 'HelperText';

    render(<HelperText>{text}</HelperText>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
