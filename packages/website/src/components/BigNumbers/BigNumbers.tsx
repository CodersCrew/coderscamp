import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';

import { StatsWithTitle } from './StatsWithTitle';

const amounts = {
  currentEdition: ['7.', '1516', '200', '6'],
  previousEditions: ['6526', '1022', '372', '502'],
};

const labels = {
	currentEdition: ['edycja', 'zadań i materiałów', 'miejsc na kurs', 'projektów do stworzenia'],
	previousEditions: ['zgłoszeń', 'osób na kursie', 'wydanych certyfikatów', 'zakodowanych projektów'],
};

export const BigNumbers = () => {
  return (
    <Flex justify="center" mx="auto" pt="80px" maxW="min(1120px, 100%)">
      <VStack spacing="80px" width="100%">
        <StatsWithTitle amounts={amounts.currentEdition} labels={labels.currentEdition} title='BIEŻĄCA EDYCJA'/>
        <StatsWithTitle amounts={amounts.previousEditions} labels={labels.previousEditions} title='POPRZEDNIE EDYCJE'/>
      </VStack>
    </Flex>
  );
};
