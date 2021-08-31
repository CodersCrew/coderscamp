import React, { ReactNode } from 'react';
import Image from 'next/image';

import { Box } from '@coderscamp/ui/components/Box';
import { Circle } from '@coderscamp/ui/components/Circle';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import code from '@/assets/code.jpg';
import { MODULES_COUNT, PROJECTS_COUNT, TEAM_SIZE } from '@/constants';

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
    <Flex
      pb="40px"
      justifyContent="center"
      pt={{ base: '40px', lg: '80px' }}
      px={{ base: '16px', sm: '32px', lg: '64px' }}
    >
      <VStack spacing={{ base: '32px', lg: '64px' }} w="1280px">
        <Typography size="4xl" color="gray.900" weight="extrabold">
          Czym jest CodersCamp?
        </Typography>
        <HStack spacing="64px">
          <Box color="gray.500">
            <Typography size="lg" mb="24px">
              CodersCamp to 6-miesięczny, darmowy kurs programowania webowego, organizowany przez Stowarzyszenie
              CodersCrew. Misją, jaką sobie wyznaczyliśmy, jest przeprowadzić każdego od pierwszych linii kodu do
              rozpoczęcia kariery jako web developer. Aby wziąć udział w kursie nie musisz posiadać żadnego
              doświadczenia. Podczas kursu zapewnimy Ci:
            </Typography>
            <VStack spacing="12px">
              <ListItem>
                <Typography weight="extrabold" as="p">
                  interaktywny plan nauki
                </Typography>
                składający się z {MODULES_COUNT} modułów tematycznych. Każdy moduł to kilkanaście sekcji, które pozwolą
                Ci zarówno zapoznać się z teorią dotyczącą danego zagadnienia, jak <br />i wykorzystać zdobytą wiedzę w
                praktyce.
              </ListItem>
              <ListItem>
                <Typography weight="extrabold" as="p">
                  pracę w {TEAM_SIZE}-osobowym zespole
                </Typography>
                prowadzonym przez doświadczonego mentora. Wspólnie zrealizujecie aż {PROJECTS_COUNT} praktycznych,
                zróżnicowanych projektów, budując tym samym swoje portfolio.
              </ListItem>
              <ListItem>
                <Typography weight="extrabold" as="p">
                  wspierającą społeczność
                </Typography>
                składającą się z kilkuset osób, które tak jak Ty stawiają pierwsze kroki w branży IT oraz
                kilkudziesięciu ekspertów i mentorów, na których wsparcie będziesz mógł liczyć przez cały kurs.
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
            <Image layout="fill" src={code} alt="Lines of code" />
          </Box>
        </HStack>
      </VStack>
    </Flex>
  );
};
