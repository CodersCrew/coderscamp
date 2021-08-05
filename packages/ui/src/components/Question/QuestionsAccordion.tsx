import React from 'react';
import { Accordion } from '@chakra-ui/react';

import { Question, QuestionProps } from './Question';

export type QuestionsAccordionProps = {
  questions: QuestionProps[];
  allowToggle?: boolean;
  allowMultiple?: boolean;
};

export const QuestionsAccordion = ({
  questions,
  allowToggle = true,
  allowMultiple = true,
}: QuestionsAccordionProps) => {
  return (
    <Accordion allowToggle={allowToggle} allowMultiple={allowMultiple}>
      {questions.map(({ title, content }) => {
        return <Question title={title} content={content} key={title} />;
      })}
    </Accordion>
  );
};
