import React from 'react';

import { Avatar, AvatarGroup } from '../Avatar';
import type { BoxProps } from '../Box';
import { Box } from '../Box';
import { Link } from '../Link';
import { Typography } from '../Typography';

export const NOT_ACTIVE_TEXT =
  'Jeszcze nie działasz w żadnym zespole. Zostaniesz do niego przydzielony automatycznie po napisaniu pierwszego testu i zakwalifikowaniu się na kurs.';

export type TeamMember = {
  id: number;
  name: string;
  image?: string;
  profileUrl: string;
};

export interface TeamCardProps extends BoxProps {
  members: TeamMember[];
  mentors: TeamMember[];
  active: boolean;
}

type AvatarProps = {
  teamMembers: TeamMember[];
};

const Avatars = ({ teamMembers }: AvatarProps) => {
  return (
    <AvatarGroup spacing="24px" marginTop="4px">
      {teamMembers.map(({ id, name, image, profileUrl }) => (
        <Link href={profileUrl} key={id}>
          <Avatar src={image} name={name} size="sm" />
        </Link>
      ))}
    </AvatarGroup>
  );
};

export const TeamCard = ({ members, mentors, active, ...props }: TeamCardProps) => {
  return (
    <Box width="100%" boxShadow="base" borderRadius={8} padding="24px" {...props}>
      <Typography size="2xl" fontWeight={800} lineHeight="28px">
        Twój zespół
      </Typography>
      <Box marginTop="24px">
        {active ? (
          <>
            <Typography fontWeight="medium" size="md">
              Członkowie
            </Typography>
            <Avatars teamMembers={members} />
            <Typography fontWeight="medium" size="md" marginTop="16px">
              Mentor
            </Typography>
            <Avatars teamMembers={mentors} />
          </>
        ) : (
          <Typography fontWeight="400" lineHeight="24px">
            {NOT_ACTIVE_TEXT}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
