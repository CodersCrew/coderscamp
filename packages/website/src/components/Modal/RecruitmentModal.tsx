import React, { useContext } from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@coderscamp/ui/components/Modal';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { ModalContextType } from './Modal.data';
import { ModalForm } from './ModalForm';
import { ModalContext } from './ModalProvider';

export const RecruitmentModal = () => {
  const modalContentPaddings = useBreakpointValue({
    base: '32px 16px 16px 32px',
    md: '56px 64px 64px 64px',
  } as const);
  const modalBodyMarginBottom = useBreakpointValue({ base: '16px', lg: '32px' } as const);
  const { isOpen, onClose, modalContent } = useContext(ModalContext) as NonNullable<ModalContextType>;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          p={modalContentPaddings}
          borderRadius="8px"
          maxWidth={800}
          minHeight={448}
          boxShadow="large"
          textAlign="center"
        >
          <ModalHeader p={0}>
            <Typography as="h2" size="4xl" weight="extrabold" color="gray.900" style={{ whiteSpace: 'pre-line' }}>
              {modalContent.header}
            </Typography>
          </ModalHeader>

          <ModalBody p={0}>
            <Typography as="p" size="lg" color="gray.500" mb={modalBodyMarginBottom} mt="12px">
              {modalContent.body}
            </Typography>
            <ModalForm />
          </ModalBody>
          <ModalFooter p={0}>
            <Typography as="p" size="sm" color="gray.500" mt="24px">
              {modalContent.footer}
            </Typography>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
