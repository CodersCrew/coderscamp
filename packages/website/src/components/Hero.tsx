import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';

import { forParticipant } from './Modals/Modal.data';
import { RecruitmentModal } from './Modals/RecruitmentModal';

export const Hero = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg' } as const);
  const buttonsStackDirection = useBreakpointValue({ base: 'column', md: 'row' } as const);

  const mainHeaderSize = { base: '4xl', sm: '6xl', md: '7xl', xl: '8xl' } as const;
  const subheaderSize = { base: 'md', sm: 'xl', md: '2xl' } as const;
  const buttonProps = { size: buttonSize, width: 'min(280px, 75vw)' } as const;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justify="center" width="100%" p={{ base: '32px 16px 64px', sm: '120px 64px 160px' }}>
      <VStack spacing={{ base: '24px', md: '56px' }} maxW="min(1400px, 100%)">
        <VStack spacing={{ base: '16px', md: '32px' }} textAlign="center">
          <Typography size={mainHeaderSize} color="gray.900" weight="extrabold">
            Największy otwarty kurs programowania webowego w Polsce
          </Typography>
          <Typography size={subheaderSize} color="gray.500">
            Dołącz do 6-osobowego zespołu • Rozwijaj się dzięki wsparciu doświadczonego mentora • Poznaj od podstaw
            programowanie webowe • Stwórz aż 6 praktycznych projektów • Rozpocznij swoją karierę jako web developer
          </Typography>
        </VStack>
        <Stack spacing={{ base: '12px', sm: '24px' }} direction={buttonsStackDirection}>
          <Button {...buttonProps} color="brand" onClick={onOpen}>
            Zapisz się na CodersCamp
          </Button>
          <RecruitmentModal isOpen={isOpen} onClose={onClose} modalText={forParticipant} />
          <Button {...buttonProps}>Pobierz plan kursu</Button>
        </Stack>
      </VStack>
    </Flex>
  );
};
