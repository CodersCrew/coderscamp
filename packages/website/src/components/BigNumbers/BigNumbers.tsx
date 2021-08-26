import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';

import { PLACES_COUNT } from '../../constants';
import { StatsWithTitle } from './StatsWithTitle';

const currentEdition = [
  { amount: '7.', label: 'edycja' },
  { amount: '1 516', label: 'zadań i materiałów' },
  { amount: String(PLACES_COUNT), label: 'miejsc na kursie' },
  { amount: '6', label: 'projektów do stworzenia' },
];

const previousEditions = [
  { amount: '6 526', label: 'zgłoszeń' },
  { amount: '1 022', label: 'osób na kursie' },
  { amount: '372', label: 'wydanych certyfikatów' },
  { amount: '502', label: 'zakodowanych projektów' },
];

export const BigNumbers = () => {
  return (
    <Flex justify="center" mx="auto" pt="40px" pb="80px" maxW="min(1120px, 100%)">
      <VStack spacing="80px" width="100%">
        <StatsWithTitle statistics={currentEdition} title="BIEŻĄCA EDYCJA" />
        <StatsWithTitle statistics={previousEditions} title="POPRZEDNIE EDYCJE" />
      </VStack>
    </Flex>
  );
};
