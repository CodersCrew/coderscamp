import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
// import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { SolidDownloadIcon } from '@coderscamp/ui/icons';

import { TechCarousel } from './TechCarousel';

export const CurriculumSection = () => {
  return (
    <VStack spacing={8} justify="center" align="center" direction="column" py="80px" width="100%">
      <Typography size="4xl" weight="bold" color="gray.900">
        Czego nauczysz się na kursie?
      </Typography>
      <TechCarousel />
      <VStack maxW="min(1280px, 100%)" spacing={8}>
        <Typography as="p" color="gray.500" size="lg" textAlign="center">
          Przygotowaliśmy dla Ciebie pełen wykaz najważniejszych zagadnień, które odnajdziesz w ramach naszego
          interaktywnego planu nauki. Dbamy, abyś podczas kursu zawsze korzystał z najnowszych wersji bibliotek i
          narzędzi, także pamiętaj, że zawartość niektórych sekcji planu może jeszcze lekko ewoluować na przestrzeni
          miesięcy. Lista nie zawiera tematów projektów, jako że na CodersCamp nie są one przez nas narzucane – o
          wszystkim decydujecie wspólnie w ramach zespołu.
        </Typography>
        <Button
          colorScheme="brand"
          px="24px"
          py="10px"
          icon={<SolidDownloadIcon />}
          aria-label="Download Icon Button"
          size="lg"
          fontWeight="medium"
        >
          Pobierz plan kursu
        </Button>
        <TechCarousel />
      </VStack>
    </VStack>
  );
};
