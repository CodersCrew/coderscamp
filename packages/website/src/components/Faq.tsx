import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { QuestionsAccordion } from '@coderscamp/ui/components/Question';
import { Typography } from '@coderscamp/ui/components/Typography';

const questions = [
  {
    title: 'Jaki wynik trzeba osiągnąć z testu, aby dostać się na CodersCamp?',
    content: 'Próg wejścia zależy od ogólnych wyników.',
  },
  {
    title: 'Co jeśli nie przejdę do kolejnego etapu?',
    content:
      'To na pewno jeszcze nie koniec drogi. Materiały udostępniane są dla wszystkich, którzy wzieli udział w rekrutacji, co daje możliwość samodzielnej nauki.',
  },
  {
    title: 'Ile czasu będzie trzeba poświęcić na naukę i projekty?',
    content: 'CodersCamp jest dosyć intensywnym kursem i wymaga koło 20 godzin tygodniowo.',
  },
  {
    title: 'Ile miesięcy trwa CodersCamp?',
    content: 'CodersCamp trwa 5 miesięcy, od listopada do kwietnia.',
  },
];

export const Faq = () => {
  const mainHeaderSize = { base: '4xl', md: '5xl', xl: '6xl' } as const;

  return (
    <Flex flexWrap="wrap" mx={{ base: '30px', xl: 'auto' }} justify="center" maxW="min(1280px, 100%)">
      <Box style={{ width: '100%' }}>
        <Typography
          mb={{ base: '32px', lg: '64px' }}
          mt="80px"
          as="h1"
          size={mainHeaderSize}
          weight="bold"
          textAlign="center"
          color="gray.900"
        >
          Najczęściej zadawane pytania
        </Typography>
        <QuestionsAccordion questions={questions} />
      </Box>
    </Flex>
  );
};
