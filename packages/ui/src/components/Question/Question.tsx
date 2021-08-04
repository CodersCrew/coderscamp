import React from 'react';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

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
          <Box flex="1" textAlign="left">
            <Typography size="lg" weight="medium">
              {title}
            </Typography>
          </Box>
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
