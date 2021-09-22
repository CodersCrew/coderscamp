import React from 'react';

import { BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import {
  BallotCheckIcon,
  BooksIcon,
  CalendarStarIcon,
  CodeIcon,
  DiplomaIcon,
  FaceGlassesIcon,
  GiftCardIcon,
  GlobeIcon,
  HandHoldingHeartIcon,
  MessagesIcon,
  SignsPostIcon,
  SparklesIcon,
  ToolboxIcon,
  UserGroupCrownIcon,
  UsersIcon,
} from '@coderscamp/ui/icons/benefits';

import { PROJECTS_COUNT, TEAM_SIZE } from '@/constants';

export const aboutBenefitItems: BenefitCardProps[] = [
  {
    icon: <SparklesIcon />,
    title: 'Atrakcyjne portfolio',
    subtitle: `Podczas kursu stworzysz i opublikujesz w sieci aż ${PROJECTS_COUNT} projektów! Nauczysz się także, jak opisywać i zaprezentować każdy z nich, aby Twoje portfolio było atrakcyjne dla rekruterów.`,
  },
  {
    icon: <UsersIcon />,
    title: 'Praca zespołowa',
    subtitle: `W branży IT nigdy nie działasz sam – u nas też nie będziesz. Każdy z projektów zrealizujesz wspólnie z ${TEAM_SIZE}-osobowym zespołem, doskonaląc swoje umiejętności pracy w grupie.`,
  },
  {
    icon: <UserGroupCrownIcon />,
    title: 'Wsparcie mentora',
    subtitle:
      'Już od pierwszego projektu w Twoim zespole pojawi się mentor – dedykowana danemu zespołowi, doświadczona osoba, która wesprze Cię na każdym etapie rozwoju oraz realizacji projektów.',
  },
  {
    icon: <MessagesIcon />,
    title: 'Społeczność',
    subtitle:
      'Od początku kursu otrzymujesz dostęp do wewnętrznego komunikatora, na którym możesz zadawać pytania i wymieniać się wiedzą z innymi uczestnikami i mentorami.',
  },
  {
    icon: <BallotCheckIcon />,
    title: 'Interaktywny plan nauki',
    subtitle:
      'Wszystkie materiały do nauki zebraliśmy dla Ciebie w postaci interaktywnej checklisty, pozwalającej na odhaczanie przerobionych treści oraz bieżące śledzenie postępów.',
  },
  {
    icon: <BooksIcon />,
    title: 'Różnorodność materiałów',
    subtitle:
      'Artykuły, prezentacje, podcasty, filmiki, kursy, gry, interaktywne zadania, sandbox’y – to tylko niektóre spośród kilkudziesięciu form materiałów, z jakimi spotkasz się na kursie.',
  },
  {
    icon: <HandHoldingHeartIcon />,
    title: 'Inicjatywa non-profit',
    subtitle:
      'Naszą siłą napędową jest kilkadziesiąt osób, które po godzinach postanowiły wspierać innych we wchodzeniu w świat IT. Dzięki nim CodersCamp jest w pełni darmowy.',
  },
  {
    icon: <ToolboxIcon />,
    title: 'Praktyczne narzędzia',
    subtitle:
      'Na kursie spotkasz się z dziesiątkami narzędzi używanych na co dzień w branży IT. Będziesz miał także okazję lepiej je poznać dzięki specjalnym materiałom dodatkowym.',
  },

  {
    icon: <SignsPostIcon />,
    title: 'Drogowskazy kariery',
    subtitle:
      'Bliżej końca kursu pośród materiałów odnajdziesz wiele dodatkowych źródeł i porad, dzięki którym będziesz mógł zaplanować swój dalszy rozwój po zakończeniu CodersCamp.',
  },
  {
    icon: <GlobeIcon />,
    title: 'Kurs online +',
    subtitle:
      'Jeśli chcesz, możesz ukończyć CodersCamp bez wychodzenia z domu. Niemniej dzięki dobieraniu zespołów wedle miejscowości zyskasz także szansę zintegrowania się z zespołem w formie offline.',
  },
  {
    icon: <CalendarStarIcon />,
    title: 'Elastyczny harmonogram',
    subtitle:
      'U nas możesz swobodnie planować swoją naukę i dowolnie ustalać z zespołem czas spotkań. Jedyne wiążące terminy, to daty zakończenia poszczególnych modułów kursu.',
  },
  {
    icon: <FaceGlassesIcon />,
    title: 'Zgłębianie tematów',
    subtitle:
      'Większość materiałów podzielona jest na 3 części, z których jedynie pierwsza jest obowiązkowa. Pozostałe umożliwią Ci zgłębienie tematów, które najbardziej Cię interesują.',
  },
  {
    icon: <DiplomaIcon />,
    title: 'Dyplom i certyfikat',
    subtitle:
      'Kończąc CodersCamp, otrzymasz od nas dyplom potwierdzający przejście kursu. Jeżeli znajdziesz się pośród najlepszych uczestników, zamiast niego wręczymy Ci imienny certyfikat, powtierdzający Twoją wiedzę.',
  },
  {
    icon: <CodeIcon />,
    title: 'Testy i zadania praktyczne',
    subtitle:
      'Każda spośród kilkudziesięciu sekcji kursu kończy się testem, a większość z nich posiada małe zadania praktyczne. Dzięki temu zawsze możesz sprawdzać, jak dobrze opanowałeś dany materiał.',
  },
  {
    icon: <GiftCardIcon />,
    title: 'Dodatkowe wsparcie',
    subtitle:
      'W CodersCamp warto się angażować. Osoby i zespoły wyróżniające się w każdym z etapów mogą liczyć na dodatkowe wsparcie w postaci książek, próbnych rozmowów rekrutacyjnych, konsultacji CV itp.',
  },
];
