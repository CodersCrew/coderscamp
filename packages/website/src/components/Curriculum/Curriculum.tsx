import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidDownloadIcon } from '@coderscamp/ui/icons';

import { COURSE_PLAN_URL } from '@/constants';

import { Section } from '../Section';
import { techNamesBottom, techNamesTop } from './Curriculum.data';
import { TechSliding } from './TechSliding';

export const Curriculum = () => {
  const buttonSize = useBreakpointValue({ base: 'md', sm: 'lg' } as const);
  const textSize = { base: 'md', md: 'lg' } as const;

  return (
    <Section spacing="64px" fullWidth>
      <Typography size="4xl" weight="bold" color="gray.900">
        Czego nauczysz się na kursie?
      </Typography>
      <VStack spacing="40px" width="100%">
        <TechSliding techIcons={techNamesTop} />
        <Section spacing="32px" py={0}>
          <Typography as="p" color="gray.500" size={textSize} textAlign="center">
            Przygotowaliśmy dla Ciebie pełen wykaz najważniejszych zagadnień, które odnajdziesz w ramach naszego
            interaktywnego planu nauki. Dbamy, abyś podczas kursu zawsze korzystał z najnowszych wersji bibliotek i
            narzędzi, także pamiętaj, że zawartość niektórych sekcji planu może jeszcze lekko ewoluować na przestrzeni
            miesięcy. Lista nie zawiera tematów projektów, jako że na CodersCamp nie są one przez nas narzucane – o
            wszystkim decydujecie wspólnie w ramach zespołu.
          </Typography>
          <Button as="a" href={COURSE_PLAN_URL} color="brand" icon={<SolidDownloadIcon />} size={buttonSize}>
            Pobierz plan kursu
          </Button>
        </Section>
        <TechSliding techIcons={techNamesBottom} reverse />
      </VStack>
    </Section>
  );
};
