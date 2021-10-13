import type { ReactElement } from 'react';

import {
  AwardIcon,
  FileInvoiceDollarIcon,
  GiftIcon,
  HandsHelpingIcon,
  TrophyIcon,
  UserTieIcon,
} from '@coderscamp/ui/icons/benefits';

export interface StrategicPartnershipBenefit {
  icon: ReactElement;
  title: string;
  content: string;
}

export const strategicPartnershipBenefits: StrategicPartnershipBenefit[] = [
  {
    icon: <FileInvoiceDollarIcon />,
    title: 'Płatny staż',
    content:
      'Jeżeli znajdziesz się pośród najlepszych uczestników kursu, zostaniesz zaproszony na 3-miesięczny, płatny staż w firmie LiveChat, z możliwością pełnego zatrudnienia po tym okresie.',
  },
  {
    icon: <HandsHelpingIcon />,
    title: 'Rozwój mentorów',
    content:
      'Twój mentor weźmie udział w szkoleniach prowadzonych przez ekspertów z firmy LiveChat. Będzie mógł też w każdej chwili skorzystać z ich wsparcia podczas prowadzenia Twojego zespołu.',
  },
  {
    icon: <UserTieIcon />,
    title: 'Stworzenie własnego produktu',
    content:
      'Bliżej końca kursu możesz wziąć udział w projekcie przygotowania aplikacji, którą następnie udostępnisz w LiveChat Marketplace. W całym procesie możesz liczyć na pomoc developerów z LiveChat.',
  },
  {
    icon: <TrophyIcon />,
    title: 'Hackathon',
    content:
      'Zwieńczenie kursu oraz coś, czego każdy dev powinien doświadczyć. Dzięki LiveChat będziesz mógł spotkać się ze swoim zespołem na żywo i w 24 godziny stworzyć rozwiązanie konkretnego problemu.',
  },
  {
    icon: <GiftIcon />,
    title: 'Welcome pack',
    content:
      'Zaraz po dostaniu się na CodersCamp otrzymasz od nas paczkę zawierającą kilka gadżetów, które z dużą pewnością przydadzą Ci się podczas przechodzenia przez kolejne etapy kursu.',
  },
  {
    icon: <AwardIcon />,
    title: 'Nagrody w trakcie kursu',
    content:
      'Książki, konsultacje CV, czy próbne rozmowy rekrutacyjne to tylko niektóre z nagród, które będziesz mógł zdobyć podejmując się dodatkowych wyzwań podczas każdego z modułów.',
  },
];
