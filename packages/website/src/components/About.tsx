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
              CodersCamp to 6-miesięczny, darmowy kurs programowania webowego organizowany przez Stowarzyszenie
              CodersCrew. Misją, jaką sobie wyznaczyliśmy, jest przeprowadzić każdego od pierwszych linii kodu do
              rozpoczęcia kariery jako web developer.
            </Typography>
            <Typography mb="16px">
              Aby wziąć udział w bootcampie <b>nie musisz posiadać żadnego wcześniejszego doświadczenia</b> – wystarczą
              duże pokłady czasu i zaangażowania, które będziesz mógł przeznaczyć na wyzwania, jakie dla Ciebie
              przygotowaliśmy.
            </Typography>
            <Typography mb="16px">Podczas kursu:</Typography>
            <VStack spacing="12px">
              <ListItem>
                Otrzymasz od nas <b>interaktywny plan nauki</b>, składający się z{' '}
                <b>{MODULES_COUNT} modułów tematycznych</b>. Każdy moduł to kilkanaście sekcji, które pozwolą Ci zarówno
                zapoznać się z teorią dotyczącą danego zagadnienia, jak i wykorzystać zdobytą wiedzę w praktyce.
              </ListItem>
              <ListItem>
                Dołączysz do <b>{TEAM_SIZE}-osobowego zespołu</b> prowadzonego przez <b>doświadczonego mentora</b>.
                Wspólnie zrealizujecie aż <b>{PROJECTS_COUNT} praktycznych projektów</b> o rosnącej skali, budując tym
                samym swoje portfolio.
              </ListItem>
              <ListItem>
                Staniesz się częścią <b>społeczności składającej się z kilkuset osób</b>, które tak jak Ty stawiają
                pierwsze kroki w branży IT oraz <b>kilkudziesięciu ekspertów i mentorów</b>, na których wsparcie
                będziesz mógł liczyć przez cały kurs.
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
