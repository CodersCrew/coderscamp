import React from 'react';
import { render, screen } from '@testing-library/react';

import { members, mentors } from './assets/teamMembers';
import { notActiveText, TeamCard } from './TeamCard';

describe('TeamCard', () => {
  it('renders team members correctly', () => {
    const role = 'group';

    render(<TeamCard mentors={mentors} members={members} active />);

    const groupRole = screen.getAllByRole(role);

    /* eslint-disable testing-library/no-node-access */
    expect(groupRole[0].children.length).toEqual(6);
    expect(groupRole[1].children.length).toEqual(1);
  });

  it('renders correctly in not active state', () => {
    render(<TeamCard mentors={mentors} members={members} active={false} />);

    expect(screen.getByText(notActiveText)).toBeVisible();
  });
});
