import React from 'react';
import { render, screen } from '@testing-library/react';

import { SolidGitHubIcon } from '../../icons';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders correctly', () => {
    render(<IconButton aria-label="icon-btn" icon={<SolidGitHubIcon />} />);

    const iconButton = screen.getByLabelText('icon-btn');

    expect(iconButton).toBeInTheDocument();
  });
});
