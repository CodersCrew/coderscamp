import { TeamMember } from './TeamCard';

const imageUrl =
  'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';

const MEMBERS_NAME = 'Ryan Buckley';
export const MEMBERS_INITIALS = 'RB';

const MENTORS_NAME = 'Sophie Mcdonald';
export const MENTORS_INITIALS = 'SM';

export const members: TeamMember[] = [
  {
    id: 1,
    name: MEMBERS_NAME,
    image: imageUrl,
    profileUrl: '/',
  },
  {
    id: 2,
    name: MEMBERS_NAME,
    profileUrl: '/',
  },
  {
    id: 3,
    name: MEMBERS_NAME,
    image: imageUrl,
    profileUrl: '/',
  },
  {
    id: 4,
    name: MEMBERS_NAME,
    profileUrl: '/',
  },
  {
    id: 5,
    name: MEMBERS_NAME,
    image: imageUrl,
    profileUrl: '/',
  },
  {
    id: 6,
    name: MEMBERS_NAME,
    profileUrl: '/',
  },
];

export const mentors: TeamMember[] = [
  {
    id: 7,
    name: MENTORS_NAME,
    image: imageUrl,
    profileUrl: '/',
  },
];
