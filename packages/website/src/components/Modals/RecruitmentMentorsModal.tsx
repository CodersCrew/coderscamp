import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Modal, ModalContent, ModalOverlay } from '@coderscamp/ui/components/Modal';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';

import { ModalUserDataForm } from './ModalUserDataForm';

export const RecruitmentMentorsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          p="56px 64px 64px 64px"
          borderRadius="8px"
          maxWidth={800}
          width={800}
          maxHeight={448}
          mt={200}
          boxShadow="large"
        >
          <Center flexDirection="column">
            <Typography as="h2" size="4xl" weight="extrabold" color="gray.900" textAlign="center">
              Rekrutacja mentorów rusza już 1 września
            </Typography>

            <Typography as="p" size="lg" color="gray.500" textAlign="center" mb="32px" mt="12px">
              Zostaw nam swoje imię oraz adres e-mail. Damy Ci znać, kiedy tylko dostępny będzie formularz zgłoszeniowy
              dla mentorów.
            </Typography>
            <ModalUserDataForm />

            <Typography as="p" size="sm" color="gray.500" textAlign="center" mt="24px">
              Klikając przycisk „Wyślij” wyrażasz zgodę na przetwarzanie podanych przez Ciebie danych na potrzeby
              związane z procesem rekrutacji mentorów w ramach projektu CodersCamp oraz otrzymywanie wiadomości e-mail
              związanych z tym procesem.
            </Typography>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
