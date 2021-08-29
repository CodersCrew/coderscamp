import { Center } from '@coderscamp/ui/components/Center';
import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { Typography } from '@coderscamp/ui/components/Typography';

import { CANDIDATE_SCHEDULE_ID } from '@/constants';

import { ScheduleItem } from './ScheduleItem';
import { useCandidateSchedule } from './useSchedule';

export const CandidateSchedule = () => {
  const schedule = useCandidateSchedule();

  return (
    <Center flexDirection="column" mx="auto" w="100%" mt="120px" mb="80px" id={CANDIDATE_SCHEDULE_ID}>
      <Typography size="4xl" weight="extrabold" m="64px 0">
        Jak wziąć udział?
      </Typography>
      <SimpleGrid columns={{ xl: 3, lg: 2, sm: 1 }} spacing="40px" width={{ xl: '1280px', lg: '900px' }} px="12px">
        {schedule.map((item) => (
          <ScheduleItem key={item.index} {...item} />
        ))}
      </SimpleGrid>
    </Center>
  );
};
