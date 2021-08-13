import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidDownloadIcon } from '@coderscamp/ui/icons';

export const MentorPerspective = () => {
  const downloadSize = useBreakpointValue({ base: 'sm', sm: 'lg' } as const, 'base');

  return (
    <Center py="80px" backgroundColor="gray.50">
      <VStack spacing="32px" mx={{ base: '30px', xl: 'auto' }} maxW="min(1280px, 100%)">
        <Typography as="h2" textAlign="center" size="4xl" weight="extrabold" color="gray.900">
          CodersCamp z perspektywy mentora
        </Typography>
        <Typography pb="8px" textAlign="center" weight="normal" size="lg" color="gray.500">
          Jeżeli chcesz już teraz w szczegółach dowiedzieć się, z jakimi wyzwaniami spotkasz się jako mentor, możesz
          pobrać nasz pełny poradnik dla mentorów, klikając przycisk poniżej.
        </Typography>
        <Button size={downloadSize} color="brand" icon={<SolidDownloadIcon />}>
          Pobierz poradnik dla mentorów
        </Button>
      </VStack>
    </Center>
  );
};
