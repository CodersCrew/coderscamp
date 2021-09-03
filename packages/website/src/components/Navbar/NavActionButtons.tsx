import React from 'react';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';

import { useRecruitmentModal } from '../RecruitmentModal';

type NavActionButtonsProps = {
  direction?: 'row' | 'column';
};

export const NavActionButtons = ({ direction = 'row' }: NavActionButtonsProps) => {
  const { openModal } = useRecruitmentModal();

  return (
    <Flex flexDirection={direction}>
      <Button size="md" mr="12px" onClick={() => openModal('mentor')}>
        Zostań mentorem
      </Button>
      <Button size="md" color="brand" onClick={() => openModal('participant')}>
        Zapisz się na kurs
      </Button>
    </Flex>
  );
};
