import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { Typography } from '@coderscamp/ui/components/Typography';

interface ScheduleItemProps {
  index: number;
  date: string;
  description: string;
}

export const ScheduleItem = ({ index, date, description }: ScheduleItemProps) => {
  return (
    <Center
      flexDirection="column"
      justifyContent="start"
      textAlign="center"
      w="min(400px, 95%)"
      h="292px"
      p="32px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
    >
      <Center bg="brand.500" color="white" borderRadius="8px" w="48px" h="48px" fontSize="32px">
        <Typography size="4xl" weight="extrabold" color="white">
          {index}
        </Typography>
      </Center>
      <Typography size="xl" weight="extrabold" mt="16px">
        {date}
      </Typography>
      <Typography size="lg" m="24px 0">
        {description}
      </Typography>
    </Center>
  );
};
