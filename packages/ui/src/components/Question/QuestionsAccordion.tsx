import React from 'react';
import { Accordion } from '@chakra-ui/react';

import { Question, QuestionProps } from './Question';

export type QuestionsAccordionProps = {
  items: (QuestionProps & { id: number | string })[];
  allowToggle?: boolean;
  allowMultiple?: boolean;
};

export const QuestionsAccordion = ({ items, allowToggle = true, allowMultiple = true }: QuestionsAccordionProps) => {
  return (
    <Accordion allowToggle={allowToggle} allowMultiple={allowMultiple}>
      {items.map(({ title, content, id }) => {
        return <Question title={title} content={content} key={id} />;
      })}
    </Accordion>
  );
};
