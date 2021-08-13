import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidDownloadIcon } from '@coderscamp/ui/icons';

export const MentorPerspective = () => {
  const downloadIcon = useBreakpointValue({ base: undefined, sm: <SolidDownloadIcon /> });

  return (
    <Center py="80px" backgroundColor="gray.100">
      <VStack mx={{ base: '30px', xl: 'auto' }} maxW="min(1280px, 100%)">
        <Typography pb="64px" textAlign="center" as="h2" size="4xl" weight="extrabold" color="gray.900">
          Czego oczekujemy od mentora
        </Typography>
        <Typography pb="40px" weight="normal" size="lg" color="gray.500" textAlign="center">
          Jeżeli chcesz już teraz w szczegółach dowiedzieć się, z jakimi wyzwaniami spotkasz się jako mentor, możesz
          pobrać nasz pełny poradnik dla mentorów, klikając przycisk poniżej.
        </Typography>
        <Button color="brand" icon={downloadIcon}>
          Pobierz poradnik dla mentorów
        </Button>
      </VStack>
    </Center>
  );
};
