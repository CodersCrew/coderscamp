import React from 'react';

import { Section } from '../Section';
import { Form } from './Form';
import { Heading } from './Heading';

export const Contact = () => {
  return (
    <Section spacing="48px" py={{ base: '24px', sm: '80px' }}>
      <Heading />
      <Form />
    </Section>
  );
};
