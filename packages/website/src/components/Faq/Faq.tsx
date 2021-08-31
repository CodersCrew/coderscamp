import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { QuestionsAccordion } from '@coderscamp/ui/components/Question';
import { Typography } from '@coderscamp/ui/components/Typography';

import { useQuestions } from './useQuestions';

export const Faq = () => {
  const questions = useQuestions();

  return (
    <Flex flexWrap="wrap" mx={{ base: '30px', xl: 'auto' }} justify="center" maxW="min(1280px, 100%)">
      <Box style={{ width: '100%' }}>
        <Typography
          mb={{ base: '32px', lg: '64px' }}
          size={{ base: '4xl', md: '5xl', xl: '6xl' }}
          mt="80px"
          as="h1"
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
