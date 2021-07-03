import React from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { render, screen } from '@testing-library/react';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders correctly', () => {
    render(<IconButton data-testid="icon-btn" icon={<ChatIcon />} />);

    const iconButton = screen.getByTestId('icon-btn');

    expect(iconButton).toBeInTheDocument();
  });
});
