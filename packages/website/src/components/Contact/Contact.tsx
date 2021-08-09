import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';

import { Form } from './Form';
import { Heading } from './Heading';

export const Contact = () => {
  return (
    <Center py={{ base: '40px', sm: '80px' }}>
      <VStack width="min(1280px, 100%)" spacing="48px" px={{ base: '24px', sm: '32px', lg: '64px', '2xl': 0 }}>
        <Heading />
        <Form />
      </VStack>
    </Center>
  );
};
