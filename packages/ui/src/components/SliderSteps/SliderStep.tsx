import React from 'react';
import { Center, Circle } from '@chakra-ui/react';

export interface SliderStepProps {
  current: boolean;
  onClick: () => void;
}
const currentDotProps = {
  backgroundColor: 'brand.500',
  borderColor: 'brand.200',
  borderWidth: '4px',
};
const defaultProps = {
  backgroundColor: 'gray.300',
  cursor: 'pointer',
};

export const SliderStep = ({ current, onClick }: SliderStepProps) => {
  const stepProps = current ? currentDotProps : defaultProps;
  const selectStep = () => !current && onClick();

  return (
    <Center
      w="40px"
      h="40px"
      onClick={selectStep}
      cursor={current ? '' : 'pointer'}
      role="tab"
      tabIndex={0}
      aria-selected={current}
    >
      <Circle size="12px" boxSizing="content-box" {...stepProps} />
    </Center>
  );
};
