import { useState } from 'react';

import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';

import { forMentors, ModalText } from '@/components/Modal/Modal.data';

export const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalText>(forMentors);

  const handleModalContent = (content: ModalText) => {
    setModalContent(content);
    onOpen();
  };

  return { isOpen, onClose, handleModalContent, modalContent };
};
