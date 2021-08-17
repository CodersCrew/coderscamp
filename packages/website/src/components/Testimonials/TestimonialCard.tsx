import React from 'react';

import { Avatar } from '@coderscamp/ui/components/Avatar';
import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { CodersCampRole, Testimonial } from './Testimonials.data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const roles: Record<CodersCampRole, string> = {
  student: 'Uczestnik',
  mentor: 'Mentor',
  partner: 'Partner',
};

export const TestimonialCard = ({ testimonial: { name, role, company, content, image } }: TestimonialCardProps) => {
  return (
    <VStack spacing="32px" textAlign="center">
      <Typography size={{ base: 'md', sm: 'lg' }} color="gray.700">
        {content}
      </Typography>
      <VStack spacing="8px">
        <Avatar src={image} size="lg" />
        <Center flexDirection="column">
          <Typography size="lg" weight="medium" color="gray.900">
            {name}
          </Typography>
          <Typography size="md" weight="medium" color="gray.500">
            {company}
          </Typography>
          <Typography size="md" weight="normal" color="gray.500">
            {roles[role]}
          </Typography>
        </Center>
      </VStack>
    </VStack>
  );
};
