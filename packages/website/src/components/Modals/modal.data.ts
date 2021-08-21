export type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalText: {
    header: string;
    body: string;
    footer: string;
  };
};

export const forMentors = {
  header: 'Rekrutacja mentorów rusza \n już 1 września',
  body: 'Zostaw nam swoje imię oraz adres e-mail. Damy Ci znać, kiedy tylko dostępny będzie formularz zgłoszeniowy dla mentorów.',
  footer:
    'Klikając przycisk „Wyślij” wyrażasz zgodę na przetwarzanie podanych przez Ciebie danych na potrzeby związane z procesem rekrutacji mentorów w ramach projektu CodersCamp oraz otrzymywanie wiadomości e-mail związanych z tym procesem.',
};
export const forParticipant = {
  header: 'Rekrutacja na CodersCamp rusza \n już 14 października',
  body: 'Zostaw nam swoje imię oraz adres e-mail. Damy Ci znać, kiedy tylko rozpocznie się rekrutacja i dostępny będzie formularz zgłoszeniowy na CodersCamp.',
  footer:
    'Klikając przycisk „Wyślij” wyrażasz zgodę na przetwarzanie podanych przez Ciebie danych na potrzeby związane z procesem rekrutacji uczestników na kurs programowania CodersCamp oraz otrzymywanie wiadomości e-mail związanych z tym procesem.',
};
