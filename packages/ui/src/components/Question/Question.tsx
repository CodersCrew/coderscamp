import React from 'react';
import { AccordionButton, AccordionItem, AccordionItemProps, AccordionPanel } from '@chakra-ui/react';

import { OutlinedArrowDown } from '../../icons/OutlinedArrowDown';
import { Typography } from '../Typography';

export type QuestionProps = {
  title: string;
  content: string;
} & AccordionItemProps;

export const Question = ({ title, content }: QuestionProps) => {
  return (
    <AccordionItem borderColor="gray.200" p="24px 0px">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton m="8px 0px" p="0px">
              <Typography flex="1" textAlign="left" size="lg" weight="medium" color="gray.900">
                {title}
              </Typography>
              <OutlinedArrowDown
                color="gray.400"
                transform={isExpanded ? 'rotate(-180deg)' : undefined}
                transition="transform 0.2s ease-in-out"
                width="28px"
                height="28px"
                px="6.5px"
                py="9px"
                m="0px 24px"
              />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0px 48px 0px 0px">
            <Typography as="p" size="md" weight="normal" color="gray.500">
              {content}
            </Typography>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
