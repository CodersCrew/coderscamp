import React, { ReactNode } from 'react';
import { AccordionButton, AccordionItem, AccordionItemProps, AccordionPanel } from '@chakra-ui/react';

import { OutlinedArrowDownIcon } from '../../icons/OutlinedArrowDown';
import { Typography } from '../Typography';

export interface QuestionProps extends AccordionItemProps {
  title: string;
  content: ReactNode;
}

export const Question = ({ title, content }: QuestionProps) => {
  return (
    <AccordionItem borderColor="gray.200" p="24px 0px">
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Typography flex="1" textAlign="left" size="lg" weight="medium" color="gray.900">
                {title}
              </Typography>
              <OutlinedArrowDownIcon
                color="gray.400"
                transform={isExpanded ? 'rotate(-180deg)' : undefined}
                transition="transform 0.2s ease-in-out"
                width="28px"
                height="28px"
              />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={0}>
            <Typography as="p" size="md" weight="normal" color="gray.500">
              {content}
            </Typography>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
