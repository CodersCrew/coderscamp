import React from 'react';
import { Center, FlexProps, useBreakpointValue } from '@chakra-ui/react';

import { Typography } from '../Typography';

export interface TimelineItemProps extends FlexProps {
  step: number;
  date: string;
  information: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ step, date, information, ...props }) => {
  const boxPadding = useBreakpointValue({ base: '18px', md: '32px' } as const) ?? '18px';
  const dateVerticalMargin = useBreakpointValue({ base: '16px', md: '24px' } as const) ?? '16px';

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
      {...props}
    >
      <Center
        bg="brand.500"
        borderRadius="8px"
        color="white"
        width="48px"
        height="48px"
        fontSize="36px"
        fontWeight={800}
      >
        {step}
      </Center>
      <Typography
        my={dateVerticalMargin}
        fontFamily="inter"
        fontWeight={800}
        fontSize="20px"
        letterSpacing="-0.017em"
        color="gray.900"
      >
        {date}
      </Typography>

      <Typography fontFamily="inter" letterSpacing="0.014em" color="gray.700">
        {information}
      </Typography>
    </Center>
  );
};
