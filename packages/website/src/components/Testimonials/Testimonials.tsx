import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

export interface TestimonialsProps {
  title: string;
}
export const Testimonials: React.FC<TestimonialsProps> = ({ title, children }) => {
  return (
    <Center py={{ base: '40px', lg: '80px' }} px={{ base: '16px', md: '24px', lg: '64px' }} bg="gray.50">
      <VStack spacing={{ base: '32px', sm: '64px' }} maxW="min(1280px, 100%)">
        <Typography textAlign="center" size="4xl" color="gray.900" weight="extrabold">
          {title}
        </Typography>
        {children}
      </VStack>
    </Center>
  );
};
