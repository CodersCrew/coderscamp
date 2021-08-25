import React, { createContext, ReactNode } from 'react';
import { useModal } from 'src/hooks/useModal';

import { ModalContextType } from './Modal.data';

export const ModalContext = createContext<ModalContextType>(null);

export const ModalProvider: React.FC<ReactNode | ReactNode[]> = ({ children }) => {
  const { isOpen, onClose, handleModalContent, modalContent } = useModal();

  return (
    <ModalContext.Provider value={{ isOpen, onClose, handleModalContent, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};
