import { BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
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

export const benefits: BenefitCardProps[] = [
  {
    icon: <UserTieIcon height="32px" />,
    title: 'Staniesz się lepszym liderem',
    subtitle:
      'Podczas kursu stworzysz i opublikujesz w sieci aż 6 projektów! Nauczysz się także, jak opisywać i zaprezentować każdy z nich, aby Twoje portfolio było atrakcyjne dla rekruterów.',
  },
  {
    icon: <FireIcon />,
    title: 'Podzielisz się swoją pasją',
    subtitle:
      'W branży IT nigdy nie działasz sam – u nas też nie będziesz. Każdy z projektów zrealizujesz wspólnie z 6-osobowym zespołem, doskonaląc swoje umiejętności pracy w grupie.',
  },
  {
    icon: <BrainIcon />,
    title: 'Umocnisz posiadaną wiedzę',
    subtitle:
      'Już od pierwszego projektu w Twoim zespole pojawi się mentor – dedykowana danemu zespołowi, doświadczona osoba, która wesprze Cię na każdym etapie rozwoju oraz realizacji projektów.',
  },
  {
    icon: <EyeIcon />,
    title: 'Zyskasz nową perspektywę',
    subtitle:
      'Od początku kursu otrzymujesz dostęp do wewnętrznego komunikatora, na którym możesz zadawać pytania i wymieniać się wiedzą z innymi uczestnikami i mentorami.',
  },
  {
    icon: <BookOpenReaderIcon />,
    title: 'Powrócisz do podstaw',
    subtitle:
      'Wszystkie materiały do nauki zebraliśmy dla Ciebie w postaci interaktywnej checklisty, pozwalającej na odhaczanie przerobionych treści oraz bieżące śledzenie postępów.',
  },
  {
    icon: <SitemapIcon />,
    title: 'Poznasz zarządzanie w IT',
    subtitle:
      'Artykuły, prezentacje, podcasty, filmiki, kursy, gry, interaktywne zadania, sandbox’y – to tylko niektóre spośród kilkudziesięciu form materiałów, z jakimi spotkasz się na kursie.',
  },
  {
    icon: <GraduationCapIcon />,
    title: 'Weźmiesz udział w szkoleniach',
    subtitle:
      'Naszą siłą napędową jest kilkadziesiąt osób, które po godzinach postanowiły wspierać innych we wchodzeniu w świat IT. Dzięki nim CodersCamp jest w pełni darmowy.',
  },
  {
    icon: <HandshakeSimpleIcon />,
    title: 'Rozwiniesz umiejętności miękkie',
    subtitle:
      'Na kursie spotkasz się z dziesiątkami narzędzi używanych na co dzień w branży IT. Będziesz miał także okazję lepiej je poznać dzięki specjalnym materiałom dodatkowym.',
  },
  {
    icon: <FileSparklesIcon />,
    title: 'Urozmaicisz swoje CV',
    subtitle:
      'Bliżej końca kursu pośród materiałów odnajdziesz wiele dodatkowych źródeł i porad, dzięki którym będziesz mógł zaplanować swój dalszy rozwój po zakończeniu CodersCamp.',
  },
  {
    icon: <UsersIcon />,
    title: 'Dołączysz do społeczności',
    subtitle:
      'Jeśli chcesz, możesz ukończyć CodersCamp bez wychodzenia z domu. Niemniej dzięki dobieraniu zespołów wedle miejscowości zyskasz także szansę zintegrowania się z zespołem w formie offline.',
  },
  {
    icon: <ChampagneGlassesIcon />,
    title: 'Nawiążesz nowe relacje',
    subtitle:
      'U nas możesz swobodnie planować swoją naukę i dowolnie ustalać z zespołem czas spotkań. Jedyne wiążące terminy, to daty zakończenia poszczególnych modułów kursu.',
  },
  {
    icon: <SeedlingIcon />,
    title: 'Zmienisz czyjś świat',
    subtitle:
      'Większość materiałów podzielona jest na 3 części, z których jedynie pierwsza jest obowiązkowa. Pozostałe umożliwią Ci zgłębienie tematów, które najbardziej Cię interesują.',
  },
];
