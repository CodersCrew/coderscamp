import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Requirement } from '@coderscamp/ui/components/Requirement';
import { Typography } from '@coderscamp/ui/components/Typography';

export const MentorRequirements = () => {
  const flexItemMinWidth = { base: '100%', lg: '0px' };
  const flexItemVerticalMargin = { base: '32px', lg: '0px' };

  return (
    <Box py="80px" mx={{ base: '30px', xl: 'auto' }} maxW="min(1280px, 100%)">
      <Typography mb="64px" textAlign="center" as="h2" size="4xl" weight="extrabold" color="gray.900">
        Czego oczekujemy od mentora
      </Typography>
      <Box my={{ base: '32px', lg: '64px' }}>
        <Requirement>
          Znasz już większość zagadnień poruszanych na kursie i jesteś gotowy nauczyć się reszty. Jeżeli przykładowo
          pracujesz jako Frontend Developer i nie znasz dobrze Node.js lub jako Backend Developer i nie znasz dobrze
          React’a, nie przejmuj się tym. Jeśli tylko masz chęć rozwoju w tych dziedzinach, pomożemy Ci nadrobić braki
          jeszcze przed rozpoczęciem kursu.
        </Requirement>
      </Box>
      <Flex wrap="wrap">
        <Box flex="1 1 0px" minW={flexItemMinWidth} my={flexItemVerticalMargin}>
          <Requirement>
            Posiadasz doświadczenie projektowe w branży IT. Jesteś w stanie poprzeć je ciekawym CV i/lub rozbudowanym
            portfolio na GitHubie.
          </Requirement>
        </Box>
        <Box flex="1 1 0px" mx={{ base: '0px', lg: '40px' }} minW={flexItemMinWidth} my={flexItemVerticalMargin}>
          <Requirement>
            Chcesz wspierać innych w stawianiu pierwszych kroków w branży IT. Jesteś gotowy poświęcać na to kilka godzin
            każdego tygodnia przez 6 miesięcy.
          </Requirement>
        </Box>
        <Box flex="1 1 0px" minW={flexItemMinWidth} my={flexItemVerticalMargin}>
          <Requirement>
            Przewodzenie zespołowi oraz uczenie innych sprawiają Ci przyjemność. Potrafisz w prosty sposób przedstawiać
            trudne zagadnienia.
          </Requirement>
        </Box>
      </Flex>
    </Box>
  );
};
