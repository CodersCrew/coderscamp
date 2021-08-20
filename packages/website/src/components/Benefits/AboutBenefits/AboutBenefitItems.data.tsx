import { BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import {
  BallotCheckIcon,
  BooksIcon,
  MessagesIcon,
  SparklesIcon,
  UserGroupCrownIcon,
  UsersIcon,
} from '@coderscamp/ui/icons';

export const aboutBenefitItems: BenefitCardProps[] = [
  {
    icon: <SparklesIcon />,
    title: 'Atrakcyjne portfolio',
    subtitle:
      'Podczas kursu stworzysz i opublikujesz w sieci aż 6 projektów! Nauczysz się także, jak opisywać i zaprezentować każdy z nich, aby Twoje portfolio było atrakcyjne dla rekruterów.',
  },
  {
    icon: <UsersIcon />,
    title: 'Praca zespołowa',
    subtitle:
      'W branży IT nigdy nie działasz sam – u nas też nie będziesz. Każdy z projektów zrealizujesz wspólnie z 6-osobowym zespołem, doskonaląc swoje umiejętności pracy w grupie.',
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
];
