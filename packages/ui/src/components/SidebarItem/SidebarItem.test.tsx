import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { OutlinedDashboardIcon, SolidDashboardIcon } from '../../icons';
import { SidebarItem } from './SidebarItem';

describe('SidebarItem', () => {
  it('renders correctly', () => {
    render(
      <SidebarItem path="/" icon={<OutlinedDashboardIcon />} iconSelected={<SolidDashboardIcon />} count={2021}>
        Dashboard
      </SidebarItem>,
      { wrapper: MemoryRouter },
    );

    const sidebarItem = screen.getByRole('group');
    const sidebarItemIcon = screen.getByLabelText(/dashboard/i);
    const sidebarItemBadge = screen.getByText(2021);

    expect(sidebarItem).toBeInTheDocument();
    expect(sidebarItemIcon).toBeInTheDocument();
    expect(sidebarItemBadge).toBeInTheDocument();
  });

  it('renders correctly in disabled state', () => {
    render(
      <SidebarItem path="/" disabled>
        Dashboard
      </SidebarItem>,
      { wrapper: MemoryRouter },
    );

    const sidebarItem = screen.getByRole(/group/i);
    // eslint-disable-next-line
    expect(sidebarItem).toHaveAttribute('disabled');
  });
});
