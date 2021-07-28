import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

export const Hero = () => {
  return (
    <Flex justify="center" height="100vh" width="100%" p="120px 64px 160px">
      <VStack spacing="56px" maxW="1400px">
        <VStack spacing="32px" textAlign="center">
          <Typography size="8xl" color="gray.900" weight="extrabold">
            Największy otwarty kurs programowania webowego w Polsce
          </Typography>
          <Typography size="2xl" color="gray.500">
            Dołącz do 6-osobowego zespołu • Rozwijaj się dzięki wsparciu doświadczonego mentora • Poznaj od podstaw
            programowanie webowe • Stwórz aż 6 praktycznych projektów • Rozpocznij swoją karierę jako web developer
          </Typography>
        </VStack>
        <HStack spacing="24px">
          <Button size="lg" width="280px" color="brand">
            Zapisz się na CodersCamp
          </Button>
          <Button size="lg" width="280px">
            Pobierz plan kursu
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};
