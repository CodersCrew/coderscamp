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

import { RecruitmentModalProps } from './Modal.data';
import { ModalForm } from './ModalForm';

export const RecruitmentModal = ({ isOpen, onClose, modalText }: RecruitmentModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          p={{ base: '32px 16px 16px 32px', md: '56px 64px 64px 64px' }}
          borderRadius="8px"
          maxWidth={800}
          width={800}
          minHeight={448}
          boxShadow="large"
          textAlign="center"
        >
          <ModalHeader p={0}>
            <Typography as="h2" size="4xl" weight="extrabold" color="gray.900" style={{ whiteSpace: 'pre-line' }}>
              {modalText.header}
            </Typography>
          </ModalHeader>

          <ModalBody p={0}>
            <Typography as="p" size="lg" color="gray.500" mb={{ base: '16px', lg: '32px' }} mt="12px">
              {modalText.body}
            </Typography>
            <ModalForm />
          </ModalBody>
          <ModalFooter p={0}>
            <Typography as="p" size="sm" color="gray.500" mt="24px">
              {modalText.footer}
            </Typography>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
