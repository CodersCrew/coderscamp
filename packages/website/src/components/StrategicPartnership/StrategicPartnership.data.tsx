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
      'Dla trzech najbardziej zaangażowanych uczestników kursu przygotowaliśmy stypendium w wysokości 10 000 zł na dalszy rozwój po ukończeniu kursu.',
  },
  {
    icon: <HandsHelpingIcon />,
    title: 'Profesjonalni mentorzy',
    content:
      'Twój mentor weźmie udział w szkoleniach prowadzonych przez ekspertów z LiveChat. Będzie mógł też w każdej chwili skorzystać z ich wsparcia podczas prowadzenia Twojego zespołu.',
  },
  {
    icon: <UserTieIcon />,
    title: 'Stworzenie własnego produktu',
    content:
      'Pod koniec kursu będzie możliwość opracowania własnej aplikacji, którą będzie można udostępnić i zmonetyzować w LiveChat Marketplace. Pomoże Ci w tym zespół z LiveChat.',
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
      'Każdy uczestnik CodersCamp otrzyma od nas paczkę powitalną z kilkoma drobiazgami, które pomogą Ci się podczas przechodzenia przez kolejne etapy kursu.',
  },
  {
    icon: <AwardIcon />,
    title: 'Nagrody w trakcie',
    content:
      'Książki, konsultacje CV, czy próbne rozmowy rekrutacyjne to tylko niektóre z nagród, które będą do zdobycia podczas specjalnych dodatkowych wyzwań w każdym z modułów.',
  },
];
