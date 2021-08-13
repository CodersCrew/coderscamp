import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { Typography } from '@coderscamp/ui/components/Typography';

import { ScheduleItem } from './ScheduleItem';

const schedulePlan = [
  {
    index: 0,
    date: 'W każdej chwili',
    description: (
      <>
        <Button size="lg" variant="link">
          Kliknij tutaj,
        </Button>{' '}
        aby zostawić nam swoje imię i adres e-mail. Damy Ci znać kiedy tylko rozpoczną się zapisy na kurs.
      </>
    ),
  },
  {
    index: 1,
    date: '14.10-24.10.2021',
    description: 'Załóż konto w aplikacji webowej CodersCamp i wypełnij formularz zgłoszeniowy.',
  },
  {
    index: 2,
    date: '25.10.2021',
    description: 'Otrzymasz od nas dostęp do wewnętrznego komunikatora oraz materiały z pierwszego modułu kursu.',
  },
  {
    index: 3,
    date: '25.10-24.11.2021',
    description:
      'Przerób otrzymane od nas materiały, aby przygotować się do testu kwalifikacyjnego oraz zadań praktycznych.',
  },
  {
    index: 4,
    date: '24.11.2021 o 18:00',
    description:
      'Rozwiąż test i zadania praktyczne z pierwszego modułu. Aby dostać się na kurs musisz znaleźć się wśród 200 osób z najlepszymi wynikami.',
  },
  {
    index: 5,
    date: '24.11.2021 o 20:00',
    description:
      'Odblokujesz pełną wersję naszego interaktywnego planu nauki. Jeśli dostałeś się na kurs, zostaniesz także przydzielony do zespołu projektowego.',
  },
];

export const Schedule = () => {
  return (
    <Center flexDirection="column" mx="auto" w="100%" mt="120px" mb="80px">
      <Typography size="4xl" weight="extrabold" m="64px 0">
        Jak wziąć udział?
      </Typography>
      <SimpleGrid columns={{ xl: 3, lg: 2, sm: 1 }} spacing="40px" width={{ xl: '1280px', lg: '900px' }} px="12px">
        {schedulePlan.map((item) => (
          <ScheduleItem key={item.index} {...item} />
        ))}
      </SimpleGrid>
    </Center>
  );
};
