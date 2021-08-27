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
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { RecruitmentModalForm } from './RecruitmentModalForm';
import type { ModalConfig, ModalType } from './RecruitmentModalProvider';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ModalConfig;
  modalType: ModalType;
}

export const RecruitmentModal = ({ isOpen, config, onClose, modalType }: RecruitmentModalProps) => {
  const modalContentPaddings = useBreakpointValue({ base: '32px 16px 16px 32px', md: '56px 64px 64px 64px' } as const);
  const modalBodyMarginBottom = useBreakpointValue({ base: '16px', lg: '32px' } as const);

  return (
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
            {config.header}
          </Typography>
        </ModalHeader>
        <ModalBody p={0}>
          <Typography as="p" size="lg" color="gray.500" mb={modalBodyMarginBottom} mt="12px">
            {config.body}
          </Typography>
          <RecruitmentModalForm modalType={modalType} onClose={onClose} />
        </ModalBody>
        <ModalFooter p={0}>
          <Typography as="p" size="sm" color="gray.500" mt="24px">
            {config.footer}
          </Typography>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
