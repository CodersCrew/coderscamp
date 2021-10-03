import React from 'react';

import { Section } from '../Section';
import { BottomFooter } from './BottomFooter';
import { TopFooter } from './TopFooter';

export const Footer = () => {
  return (
    <Section bg="gray.50" spacing={{ base: '40px', lg: '80px' }} color="gray.500">
      <TopFooter />
      <BottomFooter />
    </Section>
  );
};
