import React from 'react';
import { render, screen } from '@testing-library/react';

import { notActiveText, TeamCard } from './TeamCard';
import { members, mentors } from './teamMembers';

describe('TeamCard', () => {
  it('renders team members correctly', () => {
    const role = 'group';

    render(<TeamCard mentors={mentors} members={members} active />);

    const groupRole = screen.getAllByRole(role);

    /* eslint-disable testing-library/no-node-access */
    expect(groupRole[0].children.length).toEqual(members.length);
    expect(groupRole[1].children.length).toEqual(mentors.length);
  });

  it('renders correctly in not active state', () => {
    render(<TeamCard mentors={mentors} members={members} active={false} />);

    expect(screen.getByText(notActiveText)).toBeVisible();
  });
});
