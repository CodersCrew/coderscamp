import React from 'react';

import { PLACES_COUNT, PROJECTS_COUNT } from '@/constants';

import { Section } from '../Section';
import { StatsWithTitle } from './StatsWithTitle';

const currentEdition = [
  { amount: '7.', label: 'edycja' },
  { amount: '1 516', label: 'zadań i materiałów' },
  { amount: String(PLACES_COUNT), label: 'miejsc na kursie' },
  { amount: String(PROJECTS_COUNT), label: 'projektów do stworzenia' },
];

const previousEditions = [
  { amount: '6 526', label: 'zgłoszeń' },
  { amount: '1 022', label: 'osób na kursie' },
  { amount: '372', label: 'wydanych certyfikatów' },
  { amount: '502', label: 'zakodowanych projektów' },
];

export const BigNumbers = () => {
  return (
    <Section spacing="80px">
      <StatsWithTitle statistics={currentEdition} title="BIEŻĄCA EDYCJA" />
      <StatsWithTitle statistics={previousEditions} title="POPRZEDNIE EDYCJE" />
    </Section>
  );
};
