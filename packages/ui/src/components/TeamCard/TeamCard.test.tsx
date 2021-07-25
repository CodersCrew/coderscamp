import React from 'react';
import { render, screen } from '@testing-library/react';

import { NOT_ACTIVE_TEXT, TeamCard } from './TeamCard';
import { members, MEMBERS_INITIALS, mentors, MENTORS_INITIALS } from './TeamCard.mocks';

describe('TeamCard', () => {
  it('renders team members correctly', () => {
    render(<TeamCard mentors={mentors} members={members} active />);

    expect(screen.getAllByText(MEMBERS_INITIALS).length).toEqual(members.length);
    expect(screen.getAllByText(MENTORS_INITIALS).length).toEqual(mentors.length);
  });

  it('renders correctly in not active state', () => {
    render(<TeamCard mentors={mentors} members={members} active={false} />);

    expect(screen.getByText(NOT_ACTIVE_TEXT)).toBeVisible();
  });
});
