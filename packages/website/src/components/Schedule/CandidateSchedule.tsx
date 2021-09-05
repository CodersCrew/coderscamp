import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { Typography } from '@coderscamp/ui/components/Typography';

import { CANDIDATE_SCHEDULE_ID } from '@/constants';

import { Section } from '../Section';
import { ScheduleItem } from './ScheduleItem';
import { useCandidateSchedule } from './useSchedule';

export const CandidateSchedule = () => {
  const schedule = useCandidateSchedule();

  return (
    <Section spacing="64px" id={CANDIDATE_SCHEDULE_ID}>
      <Typography size="4xl" weight="extrabold">
        Jak wziąć udział?
      </Typography>
      <SimpleGrid columns={{ xl: 3, lg: 2, sm: 1 }} spacing="40px" px="12px">
        {schedule.map((item) => (
          <ScheduleItem key={item.index} {...item} />
        ))}
      </SimpleGrid>
    </Section>
  );
};
