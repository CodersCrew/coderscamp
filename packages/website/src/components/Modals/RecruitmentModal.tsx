import React from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@coderscamp/ui/components/Modal';
import { Typography } from '@coderscamp/ui/components/Typography';

import { forMentors } from './modal.data';
import { ModalForm } from './ModalForm';

type RecruitmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalText?: {
    header: string;
    body: string;
    footer: string;
  };
};

export const RecruitmentModal = ({ isOpen, onClose, modalText = forMentors }: RecruitmentModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          p="56px 64px 64px 64px"
          borderRadius="8px"
          maxWidth={800}
          width={800}
          maxHeight={448}
          boxShadow="large"
        >
          <ModalHeader p={0}>
            <Typography
              as="h2"
              size="4xl"
              weight="extrabold"
              color="gray.900"
              textAlign="center"
              style={{ whiteSpace: 'pre-line' }}
            >
              {modalText.header}
            </Typography>
          </ModalHeader>

          <ModalBody p={0}>
            <Typography as="p" size="lg" color="gray.500" textAlign="center" mb="32px" mt="12px">
              {modalText.body}
            </Typography>
            <ModalForm />
          </ModalBody>
          <ModalFooter p={0}>
            <Typography as="p" size="sm" color="gray.500" textAlign="center" mt="24px">
              {modalText.footer}
            </Typography>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
