import React, { ReactNode } from 'react';
import Image from 'next/image';

import { Box } from '@coderscamp/ui/components/Box';
import { Circle } from '@coderscamp/ui/components/Circle';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { MODULES_COUNT, PROJECTS_COUNT, TEAM_SIZE } from '@/constants';

import { Section } from './Section';

type ListItemProps = {
  children: ReactNode;
};

const ListItem = ({ children }: ListItemProps) => (
  <HStack spacing="16px" align="flex-start">
    <Circle size="6px" bg="gray.200" my="8px" />
    <Typography>{children}</Typography>
  </HStack>
);

export const About = () => {
  return (
    <Section spacing={{ base: '32px', lg: '64px' }}>
      <Typography size="4xl" color="gray.900" weight="extrabold">
        Czym jest CodersCamp?
      </Typography>
      <HStack spacing="64px">
        <Box color="gray.500">
          <Typography size="lg" mb="24px">
            CodersCamp to 6-miesięczny, darmowy kurs programowania webowego, organizowany przez Stowarzyszenie
            CodersCrew. Misją, jaką sobie wyznaczyliśmy, jest przeprowadzić każdego od pierwszych linii kodu do
            rozpoczęcia kariery jako web developer. Aby wziąć udział w kursie nie musisz posiadać żadnego doświadczenia.
            Podczas kursu zapewnimy Ci:
          </Typography>
          <VStack spacing="12px">
            <ListItem>
              <Typography weight="extrabold" as="p">
                Interaktywny plan nauki
              </Typography>
              składający się z {MODULES_COUNT} modułów tematycznych. Każdy moduł to kilkanaście sekcji, które pozwolą Ci
              zarówno zapoznać się z teorią dotyczącą danego zagadnienia, jak <br />i wykorzystać zdobytą wiedzę w
              praktyce.
            </ListItem>
            <ListItem>
              <Typography weight="extrabold" as="p">
                Pracę w {TEAM_SIZE}-osobowym zespole
              </Typography>
              prowadzonym przez doświadczonego mentora. Wspólnie zrealizujecie aż {PROJECTS_COUNT} praktycznych,
              zróżnicowanych projektów, budując tym samym swoje portfolio.
            </ListItem>
            <ListItem>
              <Typography weight="extrabold" as="p">
                Wspierającą społeczność
              </Typography>
              składającą się z kilkuset osób, które tak jak Ty stawiają pierwsze kroki w branży IT oraz kilkudziesięciu
              ekspertów i mentorów, na których wsparcie będziesz mógł liczyć przez cały kurs.
            </ListItem>
          </VStack>
        </Box>
        <Box
          position="relative"
          display={{ base: 'none', xl: 'block' }}
          minW={{ base: '520px', '2xl': '568px' }}
          alignSelf="stretch"
          borderRadius="8px"
          overflow="hidden"
        >
          <Image
            layout="fill"
            src="https://res.cloudinary.com/coderscamp/image/upload/v1630772316/images/code.jpg"
            alt="Lines of code"
          />
        </Box>
      </HStack>
    </Section>
  );
};
