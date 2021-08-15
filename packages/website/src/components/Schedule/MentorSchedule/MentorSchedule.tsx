import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';

import { ScheduleContainer } from '../ScheduleContainer';
import { ScheduleItem } from '../ScheduleItem';

const schedulePlan = [
  {
    index: 1,
    date: 'Do 16.092021',
    description: (
      <>
        Przejdź pod{' '}
        <Button size="lg" variant="link">
          ten link
        </Button>{' '}
        i wypełnij formularz zgłoszeniowy.
      </>
    ),
  },
  {
    index: 2,
    date: '17.09.2021',
    description: 'Otrzymasz od nas mail z propozycjami terminu rozmowy kwalifikacyjnej.',
  },
  {
    index: 3,
    date: '17.09-30.09.2021',
    description: 'Weź udział w rozmowie kwalifikacyjnej online.',
  },
  {
    index: 4,
    date: '01.10.2021',
    description: 'Otrzymasz od nas informację zwrotną o wyniku rekrutacji.',
  },
];

export const MentorSchedule = () => {
  return (
    <ScheduleContainer title="Chcę zostać mentorem - co dalej?">
      <SimpleGrid columns={{ xl: 4, lg: 2, sm: 1 }} spacing="40px" width={{ xl: '1280px', lg: '900px' }} px="12px">
        {schedulePlan.map((item) => (
          <ScheduleItem key={item.index} {...item} />
        ))}
      </SimpleGrid>
    </ScheduleContainer>
  );
};
