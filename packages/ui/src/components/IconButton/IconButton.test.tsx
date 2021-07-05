import React from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { render, screen } from '@testing-library/react';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders correctly', () => {
    render(<IconButton aria-label="icon-btn" icon={<ChatIcon />} />);

    const iconButton = screen.getByLabelText('icon-btn');

    expect(iconButton).toBeInTheDocument();
  });
});
