import React from 'react';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';

import { Typography } from '../Typography';

export type QuestionProps = {
  title: string;
  content: string;
};

export const Question = ({ title, content }: QuestionProps) => {
  return (
    <AccordionItem borderColor="gray.200">
      <h2>
        <AccordionButton>
          <Typography flex="1" textAlign="left" size="lg" weight="medium">
            {title}
          </Typography>
          <AccordionIcon color="gray.400" />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Typography as="p" size="md" weight="normal" color="gray.500">
          {content}
        </Typography>
      </AccordionPanel>
    </AccordionItem>
  );
};
