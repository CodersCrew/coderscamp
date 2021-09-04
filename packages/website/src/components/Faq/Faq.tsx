import React from 'react';

import { QuestionsAccordion } from '@coderscamp/ui/components/Question';
import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from '../Section';
import { useQuestions } from './useQuestions';

export const Faq = () => {
  const questions = useQuestions();

  return (
    <Section spacing={{ base: '40px', lg: '64px' }}>
      <Typography
        size={{ base: '4xl', md: '5xl', xl: '6xl' }}
        as="h1"
        weight="bold"
        textAlign="center"
        color="gray.900"
      >
        Najczęściej zadawane pytania
      </Typography>
      <QuestionsAccordion questions={questions} />
    </Section>
  );
};
