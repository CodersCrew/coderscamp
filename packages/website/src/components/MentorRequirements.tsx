import React from 'react';

import { Requirement } from '@coderscamp/ui/components/Requirement';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from './Section';

export const MentorRequirements = () => {
  const flexItemVerticalMargin = { base: '32px', lg: '40px' };

  return (
    <Section spacing="64px">
      <Typography textAlign="center" as="h2" size="4xl" weight="extrabold" color="gray.900">
        Czego oczekujemy od mentora
      </Typography>
      <VStack spacing={flexItemVerticalMargin}>
        <Requirement>
          Znasz już większość zagadnień poruszanych na kursie i jesteś gotowy nauczyć się reszty. Jeżeli przykładowo
          pracujesz jako Frontend Developer i nie znasz dobrze Node.js lub jako Backend Developer i nie znasz dobrze
          React’a, nie przejmuj się tym. Jeśli tylko masz chęć rozwoju w tych dziedzinach, pomożemy Ci nadrobić braki
          jeszcze przed rozpoczęciem kursu.
        </Requirement>
        <Stack
          height="-webkit-fit-content"
          direction={{ base: 'column', lg: 'row' }}
          spacing={flexItemVerticalMargin}
          wrap="wrap"
        >
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
      </VStack>
    </Section>
  );
};
