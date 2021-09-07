import type { ReactNode } from 'react';

import { useRecruitmentModal } from '@/components/RecruitmentModal';
import { MAIN_TEST_FULL_DATE, MENTOR_RECRUITMENT_FORM_URL, PLACES_COUNT } from '@/constants';

import { ExternalLink } from '../ExternalLink';

export interface ScheduleListItem {
  index: number;
  date: string;
  description: ReactNode;
}

export const useCandidateSchedule = (): ScheduleListItem[] => {
  const { openModal } = useRecruitmentModal();

  return [
    {
      index: 0,
      date: 'W każdej chwili',
      description: (
        <>
          <ExternalLink onClick={() => openModal('participant')}>Zostaw nam swoje imię i adres e-mail</ExternalLink>.
          Damy Ci znać kiedy tylko rozpoczną się zapisy na kurs.
        </>
      ),
    },
    {
      index: 1,
      date: '14.10 - 24.10.2021',
      description: 'Załóż konto w aplikacji webowej CodersCamp i wypełnij formularz zgłoszeniowy.',
    },
    {
      index: 2,
      date: '25.10.2021',
      description: 'Otrzymasz od nas dostęp do wewnętrznego komunikatora oraz materiały z pierwszego modułu kursu.',
    },
    {
      index: 3,
      date: '25.10 - 24.11.2021',
      description:
        'Przerób otrzymane od nas materiały, aby przygotować się do testu kwalifikacyjnego oraz zadań praktycznych.',
    },
    {
      index: 4,
      date: MAIN_TEST_FULL_DATE,
      description:
        `Rozwiąż test i zadania praktyczne z pierwszego modułu. Aby dostać się na kurs musisz znaleźć się wśród ${PLACES_COUNT} osób z najlepszymi wynikami.`,
    },
    {
      index: 5,
      date: '24.11.2021 o 20:00',
      description:
        'Odblokujesz pełną wersję naszego interaktywnego planu nauki. Jeśli dostałeś się na kurs, zostaniesz także przydzielony do zespołu projektowego.',
    },
  ];
};

export const useMentorSchedule = (): ScheduleListItem[] => {
  return [
    {
      index: 1,
      date: '03.09 - 17.09.2021',
      description: (
        <>
          Wypełnij <ExternalLink href={MENTOR_RECRUITMENT_FORM_URL}>formularz zgłoszeniowy</ExternalLink>, aby zapisać
          się na rekrutację.
        </>
      ),
    },
    {
      index: 2,
      date: '18.09.2021',
      description: 'Otrzymasz od nas mail z propozycjami terminu rozmowy kwalifikacyjnej.',
    },
    {
      index: 3,
      date: '20.09 - 30.09.2021',
      description: 'Weź udział w rozmowie kwalifikacyjnej online.',
    },
    {
      index: 4,
      date: '01.10.2021',
      description: 'Otrzymasz od nas informację zwrotną o wyniku rekrutacji.',
    },
  ];
};
