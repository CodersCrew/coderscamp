import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders correctly', () => {
    render(<Sidebar data-testid="sidebar" width="256px" />, { wrapper: MemoryRouter });

    const getSidebar = screen.getByTestId('sidebar');

    expect(getSidebar).toBeInTheDocument();
  });
});
