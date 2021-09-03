import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidDownloadIcon } from '@coderscamp/ui/icons/SolidDownload';

import { COURSE_PLAN_URL } from '@/constants';

import { techNamesBottom, techNamesTop } from './Curriculum.data';
import { TechSliding } from './TechSliding';

export const Curriculum = () => {
  const buttonSize = useBreakpointValue({ base: 'md', sm: 'lg' } as const);
  const textSize = { base: 'md', md: 'lg' } as const;

  return (
    <Flex justify="center" align="center" direction="column" my="80px" width="100%">
      <Typography size="4xl" weight="bold" color="gray.900" p={{ base: '32px 16px 64px' }}>
        Czego nauczysz się na kursie?
      </Typography>
      <TechSliding techIcons={techNamesTop} />
      <VStack maxW="min(1280px, 100%)" my="40px">
        <Typography as="p" p="0 16px 32px" color="gray.500" size={textSize} textAlign="center">
          Przygotowaliśmy dla Ciebie pełen wykaz najważniejszych zagadnień, które odnajdziesz w ramach naszego
          interaktywnego planu nauki. Dbamy, abyś podczas kursu zawsze korzystał z najnowszych wersji bibliotek i
          narzędzi, także pamiętaj, że zawartość niektórych sekcji planu może jeszcze lekko ewoluować na przestrzeni
          miesięcy. Lista nie zawiera tematów projektów, jako że na CodersCamp nie są one przez nas narzucane – o
          wszystkim decydujecie wspólnie w ramach zespołu.
        </Typography>
        <Button as="a" href={COURSE_PLAN_URL} color="brand" icon={<SolidDownloadIcon />} size={buttonSize}>
          Pobierz plan kursu
        </Button>
      </VStack>
      <TechSliding techIcons={techNamesBottom} reverse />
    </Flex>
  );
};
