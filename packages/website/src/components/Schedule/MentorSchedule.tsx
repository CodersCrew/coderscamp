import React from 'react';

import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';

import { ScheduleContainer } from './ScheduleContainer';
import { ScheduleItem } from './ScheduleItem';
import { useMentorSchedule } from './useSchedule';

export const MentorSchedule = () => {
  const schedule = useMentorSchedule();

  return (
    <ScheduleContainer title="Chcę zostać mentorem - co dalej?">
      <SimpleGrid columns={{ xl: 4, lg: 2, sm: 1 }} spacing="40px" width={{ xl: '1280px', lg: '900px' }} px="12px">
        {schedule.map((item) => (
          <ScheduleItem key={item.index} {...item} />
        ))}
      </SimpleGrid>
    </ScheduleContainer>
  );
};
