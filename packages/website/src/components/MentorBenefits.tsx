import React from 'react';

import { BenefitCard, BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import { Center } from '@coderscamp/ui/components/Center';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import {
  BookOpenReaderIcon,
  BrainIcon,
  ChampagneGlassesIcon,
  EyeIcon,
  FileSparklesIcon,
  FireIcon,
  GraduationCapIcon,
  HandshakeSimpleIcon,
  SeedlingIcon,
  SitemapIcon,
  UsersIcon,
  UserTieIcon,
} from '@coderscamp/ui/icons';

export interface Benefit extends BenefitCardProps {
  id: string;
}

export const benefits: Benefit[] = [
  {
    id: '1',
    icon: <UserTieIcon height="32px" />,
    title: 'Staniesz się lepszym liderem',
    subtitle:
      'Podczas kursu stworzysz i opublikujesz w sieci aż 6 projektów! Nauczysz się także, jak opisywać i zaprezentować każdy z nich, aby Twoje portfolio było atrakcyjne dla rekruterów.',
  },
  {
    id: '2',
    icon: <FireIcon />,
    title: 'Podzielisz się swoją pasją',
    subtitle:
      'W branży IT nigdy nie działasz sam – u nas też nie będziesz. Każdy z projektów zrealizujesz wspólnie z 6-osobowym zespołem, doskonaląc swoje umiejętności pracy w grupie.',
  },
  {
    id: '3',
    icon: <BrainIcon />,
    title: 'Umocnisz posiadaną wiedzę',
    subtitle:
      'Już od pierwszego projektu w Twoim zespole pojawi się mentor – dedykowana danemu zespołowi, doświadczona osoba, która wesprze Cię na każdym etapie rozwoju oraz realizacji projektów.',
  },
  {
    id: '4',
    icon: <EyeIcon />,
    title: 'Zyskasz nową perspektywę',
    subtitle:
      'Od początku kursu otrzymujesz dostęp do wewnętrznego komunikatora, na którym możesz zadawać pytania i wymieniać się wiedzą z innymi uczestnikami i mentorami.',
  },
  {
    id: '5',
    icon: <BookOpenReaderIcon />,
    title: 'Powrócisz do podstaw',
    subtitle:
      'Wszystkie materiały do nauki zebraliśmy dla Ciebie w postaci interaktywnej checklisty, pozwalającej na odhaczanie przerobionych treści oraz bieżące śledzenie postępów.',
  },
  {
    id: '6',
    icon: <SitemapIcon />,
    title: 'Poznasz zarządzanie w IT',
    subtitle:
      'Artykuły, prezentacje, podcasty, filmiki, kursy, gry, interaktywne zadania, sandbox’y – to tylko niektóre spośród kilkudziesięciu form materiałów, z jakimi spotkasz się na kursie.',
  },
  {
    id: '7',
    icon: <GraduationCapIcon />,
    title: 'Weźmiesz udział w szkoleniach',
    subtitle:
      'Naszą siłą napędową jest kilkadziesiąt osób, które po godzinach postanowiły wspierać innych we wchodzeniu w świat IT. Dzięki nim CodersCamp jest w pełni darmowy.',
  },
  {
    id: '8',
    icon: <HandshakeSimpleIcon />,
    title: 'Rozwiniesz umiejętności miękkie',
    subtitle:
      'Na kursie spotkasz się z dziesiątkami narzędzi używanych na co dzień w branży IT. Będziesz miał także okazję lepiej je poznać dzięki specjalnym materiałom dodatkowym.',
  },
  {
    id: '9',
    icon: <FileSparklesIcon />,
    title: 'Urozmaicisz swoje CV',
    subtitle:
      'Bliżej końca kursu pośród materiałów odnajdziesz wiele dodatkowych źródeł i porad, dzięki którym będziesz mógł zaplanować swój dalszy rozwój po zakończeniu CodersCamp.',
  },
  {
    id: '10',
    icon: <UsersIcon />,
    title: 'Dołączysz do społeczności',
    subtitle:
      'Jeśli chcesz, możesz ukończyć CodersCamp bez wychodzenia z domu. Niemniej dzięki dobieraniu zespołów wedle miejscowości zyskasz także szansę zintegrowania się z zespołem w formie offline.',
  },
  {
    id: '11',
    icon: <ChampagneGlassesIcon />,
    title: 'Nawiążesz nowe relacje',
    subtitle:
      'U nas możesz swobodnie planować swoją naukę i dowolnie ustalać z zespołem czas spotkań. Jedyne wiążące terminy, to daty zakończenia poszczególnych modułów kursu.',
  },
  {
    id: '12',
    icon: <SeedlingIcon />,
    title: 'Zmienisz czyjś świat',
    subtitle:
      'Większość materiałów podzielona jest na 3 części, z których jedynie pierwsza jest obowiązkowa. Pozostałe umożliwią Ci zgłębienie tematów, które najbardziej Cię interesują.',
  },
];

export const MentorBenefits = () => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);
  const padding = useBreakpointValue({ base: 6, md: 20 } as const);
  const titleSize = useBreakpointValue({ base: '2xl', md: '4xl' } as const);
  const titleMarginBottom = useBreakpointValue({ base: '64px', md: '92px' } as const);

  return (
    <Center flexDirection="column" bg="white" p={padding} textAlign="center">
      <Typography size={titleSize} color="gray.900" weight="extrabold" mb={titleMarginBottom}>
        Dlaczego warto zostać mentorem?
      </Typography>
      <Grid templateColumns={`repeat(${columnsCount}, 1fr)`} gap="64px 40px">
        {benefits.map(({ id, ...props }) => (
          <BenefitCard key={id} {...props} />
        ))}
      </Grid>
    </Center>
  );
};
