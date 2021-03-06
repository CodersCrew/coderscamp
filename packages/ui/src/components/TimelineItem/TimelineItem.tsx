import React from 'react';
import { Center, FlexProps, useBreakpointValue } from '@chakra-ui/react';

import { Typography } from '../Typography';

export interface TimelineItemProps extends FlexProps {
  step: number;
  date: string;
  information: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ step, date, information, ...props }) => {
  const boxPadding = useBreakpointValue({ base: '18px', md: '32px' } as const, 'base');
  const dateVerticalMargin = useBreakpointValue({ base: '16px', md: '24px' } as const, 'base');

  return (
    <Center
      bg="white"
      borderRadius="8px"
      p={boxPadding}
      pb="16px"
      minHeight="248px"
      flexDirection="column"
      justifyContent="flex-start"
      textAlign="center"
      overflow="auto"
      borderColor="gray.300"
      borderWidth="1px"
      {...props}
    >
      <Typography
        bg="brand.500"
        borderRadius="8px"
        color="white"
        width="48px"
        height="48px"
        size="4xl"
        weight="extrabold"
      >
        {step}
      </Typography>
      <Typography my={dateVerticalMargin} size="xl" color="gray.900" weight="extrabold">
        {date}
      </Typography>

      <Typography size="lg" color="gray.700">
        {information}
      </Typography>
    </Center>
  );
};
