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
} from '@coderscamp/ui/icons/benefits';

export const mentorBenefitItems: BenefitCardProps[] = [
  {
    icon: <UserTieIcon height="32px" />,
    title: 'Staniesz się lepszym liderem',
    subtitle:
      'Planowanie rozwoju, motywowanie do działania, wsparcie w przezwyciężaniu przeciwności. To tylko niektóre z kompetencji lidera, które będziesz miał okazję wypracować działając ze swoim zespołem.',
  },
  {
    icon: <FireIcon />,
    title: 'Podzielisz się swoją pasją',
    subtitle:
      'Każdy kto trafił na osobę, która była w stanie rozbudzić w nim szczere zainteresowanie jakąś dziedziną na pewno wie, jak warto tego doświadczyć. Na CodersCamp masz szansę stać się taką osobą dla innych.',
  },
  {
    icon: <BrainIcon />,
    title: 'Umocnisz posiadaną wiedzę',
    subtitle:
      'Podobno najlepszym sprawdzianem własnej wiedzy jest próba przekazania jej innym. Na CodersCamp spotkasz wiele okazji do spojrzenia z nowej perspektywy na tematy, które znasz “od zawsze”.',
  },
  {
    icon: <EyeIcon />,
    title: 'Zyskasz nową perspektywę',
    subtitle:
      'Im większe mamy doświadczenie, tym bardziej odległa staje się dla nas perspektywa osoby początkującej. Camp pozwoli Ci na nowo zobaczyć wiele aspektów oczami osoby, która dopiero poznaje dane zagadnienie.',
  },
  {
    icon: <BookOpenReaderIcon />,
    title: 'Powrócisz do podstaw',
    subtitle:
      'CodersCamp może być dla Ciebie okazją, aby odświeżyć sobie tematy, które poznałeś na początku kariery. W szybko ewoluującym świecie web devu możliwe, że odkryjesz tam coś, o czym już zdążyłeś zapomnieć.',
  },
  {
    icon: <SitemapIcon />,
    title: 'Poznasz zarządzanie w IT',
    subtitle:
      'Otrzymasz od nas materiały i szkolenia, dzięki którym dowiesz się, jak zarządzać zespołami projektowymi, a zdobytą wiedzę będziesz mógł praktycznie natychmiast zastosować w praktyce.',
  },
  {
    icon: <GraduationCapIcon />,
    title: 'Weźmiesz udział w szkoleniach',
    subtitle:
      'Jako mentor możesz liczyć na dodatkowe szkolenia z zarządzania w IT, rozwijania talentów oraz mentoringu, zorganizowane przez partnerów kursu.',
  },
  {
    icon: <HandshakeSimpleIcon />,
    title: 'Rozwiniesz umiejętności miękkie',
    subtitle:
      'Przewodząc zespołowi oraz poszczególnym osobom zyskasz wiele okazji do praktykowania umiejętności udzielania informacji zwrotnej, dbania o jakość komunikacji, czy rozwiązywania konfliktów.',
  },
  {
    icon: <FileSparklesIcon />,
    title: 'Urozmaicisz swoje CV',
    subtitle:
      'Angażowanie się w dodatkowe inicjatywy, prowadzenie zespołów projektowych i aktywna pomoc w stawianiu pierwszych kroków w IT to elementy, które z pewnością wyróżnią Twoje CV na tle innych.',
  },
  {
    icon: <UsersIcon />,
    title: 'Dołączysz do społeczności',
    subtitle:
      'Na CodersCamp poznasz wiele osób, które podobnie jak Ty szukają nowych wyzwań i chcą dać coś od siebie innym. Będą to zarówno mentorzy, jak i eksperci z innych dziedzin związanych z IT.',
  },
  {
    icon: <ChampagneGlassesIcon />,
    title: 'Nawiążesz nowe relacje',
    subtitle:
      '6 miesięcy wspólnego stawiania czoła różnym wyzwaniom sprawia, że wielu mentorów pozostaje w stałym kontakcie z członkami swoich zespołów jeszcze na długo po zakończeniu samego kursu.',
  },
  {
    icon: <SeedlingIcon />,
    title: 'Zmienisz czyjś świat',
    subtitle:
      'Dla wielu najważniejszy benefit. Nic nie daje większej satysfakcji niż świadomość, że to Ty rozbudziłeś w innych pasję do programowania i pomogłeś im postawić pierwsze kroki w swojej nowej karierze.',
  },
];
