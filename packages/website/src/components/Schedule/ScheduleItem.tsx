import { Center } from '@coderscamp/ui/components/Center';
import { Typography } from '@coderscamp/ui/components/Typography';

import type { ScheduleListItem } from './useSchedule';

export const ScheduleItem = ({ index, date, description, disabled }: ScheduleListItem) => {
  return (
    <Center
      flexDirection="column"
      justifyContent="start"
      textAlign="center"
      maxW="400px"
      minH="292px"
      p="32px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
      filter={`grayscale(${disabled ? 1 : 0})`}
      opacity={disabled ? 0.6 : 1}
      pointerEvents={disabled ? 'none' : undefined}
    >
      <Center bg="brand.500" color="white" borderRadius="8px" w="48px" h="48px" fontSize="32px">
        <Typography size="4xl" weight="extrabold" color="white">
          {index}
        </Typography>
      </Center>
      <Typography size="xl" weight="extrabold" mt="16px" color="gray.900">
        {date}
      </Typography>
      <Typography size="lg" my="24px" color="gray.700">
        {description}
      </Typography>
    </Center>
  );
};
