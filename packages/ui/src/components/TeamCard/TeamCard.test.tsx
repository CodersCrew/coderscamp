import React from 'react';
import { render, screen } from '@testing-library/react';

import { NOT_ACTIVE_TEXT, TeamCard } from './TeamCard';
import { members, mentors } from './TeamCard.mocks';

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

    expect(screen.getByText(NOT_ACTIVE_TEXT)).toBeVisible();
  });
});
