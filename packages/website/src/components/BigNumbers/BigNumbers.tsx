import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';

import { StatsWithTitle } from './StatsWithTitle';

const amounts = [
  ['7.', '1516', '200', '6'],
  ['6526', '1022', '372', '502'],
];
const labels = [
  ['edycja', 'zadań i materiałów', 'miejsc na kurs', 'projektów do stworzenia'],
  ['zgłoszeń', 'osób na kursie', 'wydanych certyfikatów', 'zakodowanych projektów'],
];

export const BigNumbers = () => {
  return (
    <Flex justify="center" mx="auto" pt="80px" maxW="min(1120px, 100%)">
      <VStack spacing="80px" width="100%">
        <StatsWithTitle amounts={amounts[0]} labels={labels[0]} />
        <StatsWithTitle amounts={amounts[1]} labels={labels[1]} />
      </VStack>
    </Flex>
  );
};
