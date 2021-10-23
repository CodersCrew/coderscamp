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
    title: 'Stypendia',
    content:
      'Dla trzech najbardziej zaangażowanych uczestników LiveChat przygotował stypendia w wysokości 10 000 zł. Pozwolą Ci one na dalszy rozwój zawodowy po ukończeniu kursu.',
  },
  {
    icon: <HandsHelpingIcon />,
    title: 'Profesjonalni mentorzy',
    content:
      'Twój mentor weźmie udział w szkoleniach prowadzonych przez ekspertów z LiveChat. Będzie mógł również zawsze skorzystać z ich wsparcia przy prowadzeniu Twojego zespołu.',
  },
  {
    icon: <UserTieIcon />,
    title: 'Stworzenie własnego produktu',
    content:
      'Pod koniec kursu otrzymasz możliwość opracowania i zmonetyzowania własnej aplikacji w LiveChat Marketplace. Jeśli podejmiesz wyzwanie, pomoże Ci w nim zespół z LiveChat.',
  },
  {
    icon: <TrophyIcon />,
    title: 'Hackathon',
    content:
      'Zwieńczenie kursu to coś, czego każdy programista powinien doświadczyć. Spotkasz się z zespołem na żywo i w 24 godziny spróbujecie stworzyć rozwiązanie konkretnego problemu.',
  },
  {
    icon: <GiftIcon />,
    title: 'Welcome pack',
    content:
      'Jako uczestnik zespołowej części CodersCamp otrzymasz od nas paczkę powitalną z kilkoma drobiazgami, które przydadzą Ci się podczas przechodzenia przez kolejne etapy kursu.',
  },
  {
    icon: <AwardIcon />,
    title: 'Nagrody w trakcie',
    content:
      'Książki, szkolenia, konsultacje CV, czy próbne rozmowy rekrutacyjne to tylko niektóre z nagród, które masz szansą zdobyć podczas dodatkowych wyzwań w ramach każdego z modułów.',
  },
];
