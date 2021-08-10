import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Requirement } from '@coderscamp/ui/components/Requirement';
import { Stack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

export const MentorRequirements = () => {
  const flexItemVerticalMargin = { base: '16px', lg: '20px' };

  return (
    <Box py="80px" mx={{ base: '30px', xl: 'auto' }} maxW="min(1280px, 100%)">
      <Typography mb="64px" textAlign="center" as="h2" size="4xl" weight="extrabold" color="gray.900">
        Czego oczekujemy od mentora
      </Typography>
      <Requirement my={{ base: '16px', lg: '64px' }}>
        Znasz już większość zagadnień poruszanych na kursie i jesteś gotowy nauczyć się reszty. Jeżeli przykładowo
        pracujesz jako Frontend Developer i nie znasz dobrze Node.js lub jako Backend Developer i nie znasz dobrze
        React’a, nie przejmuj się tym. Jeśli tylko masz chęć rozwoju w tych dziedzinach, pomożemy Ci nadrobić braki
        jeszcze przed rozpoczęciem kursu.
      </Requirement>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={flexItemVerticalMargin} wrap="wrap">
        <Requirement flex="1 1 0px">
          Posiadasz doświadczenie projektowe w branży IT. Jesteś w stanie poprzeć je ciekawym CV i/lub rozbudowanym
          portfolio na GitHubie.
        </Requirement>
        <Requirement flex="1 1 0px">
          Chcesz wspierać innych w stawianiu pierwszych kroków w branży IT. Jesteś gotowy poświęcać na to kilka godzin
          każdego tygodnia przez 6 miesięcy.
        </Requirement>
        <Requirement flex="1 1 0px">
          Przewodzenie zespołowi oraz uczenie innych sprawiają Ci przyjemność. Potrafisz w prosty sposób przedstawiać
          trudne zagadnienia.
        </Requirement>
      </Stack>
    </Box>
  );
};
