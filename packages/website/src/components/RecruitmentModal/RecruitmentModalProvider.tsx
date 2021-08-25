import React, { createContext, ReactNode, useState } from 'react';

import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';

import { RecruitmentModal } from './RecruitmentModal';

export type ModalType = 'mentor' | 'participant';

export interface ModalConfig {
  header: string;
  body: string;
  footer: string;
}

export interface RecruitmentModalContextType {
  openModal: (type: ModalType) => void;
}

const modalConfigs: Record<ModalType, ModalConfig> = {
  mentor: {
    header: 'Rekrutacja mentorów rusza \n już 1 września',
    body: 'Zostaw nam swoje imię oraz adres e-mail. Damy Ci znać, kiedy tylko dostępny będzie formularz zgłoszeniowy dla mentorów.',
    footer:
      'Klikając przycisk „Wyślij” wyrażasz zgodę na przetwarzanie podanych przez Ciebie danych na potrzeby związane z procesem rekrutacji mentorów w ramach projektu CodersCamp oraz otrzymywanie wiadomości e-mail związanych z tym procesem.',
  },
  participant: {
    header: 'Rekrutacja na CodersCamp rusza \n już 14 października',
    body: 'Zostaw nam swoje imię oraz adres e-mail. Damy Ci znać, kiedy tylko rozpocznie się rekrutacja i dostępny będzie formularz zgłoszeniowy na CodersCamp.',
    footer:
      'Klikając przycisk „Wyślij” wyrażasz zgodę na przetwarzanie podanych przez Ciebie danych na potrzeby związane z procesem rekrutacji uczestników na kurs programowania CodersCamp oraz otrzymywanie wiadomości e-mail związanych z tym procesem.',
  },
};

export const RecruitmentModalContext = createContext<RecruitmentModalContextType>({
  openModal: () => {},
});

export const RecruitmentModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [config, setConfig] = useState<ModalConfig>(modalConfigs.mentor);

  const openModal: RecruitmentModalContextType['openModal'] = (type) => {
    setConfig(modalConfigs[type]);
    onOpen();
  };

  return (
    <RecruitmentModalContext.Provider value={{ openModal }}>
      {children}
      <RecruitmentModal isOpen={isOpen} onClose={onClose} config={config} />
    </RecruitmentModalContext.Provider>
  );
};
