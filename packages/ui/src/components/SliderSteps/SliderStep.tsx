import React from 'react';
import { Circle } from '@chakra-ui/react';

export interface SliderStepProps {
  current: boolean;
  onClick: () => void;
}
const currentDotProps = {
  backgroundColor: 'brand.500',
  mx: '2px',
  borderColor: 'brand.200',
  borderWidth: '4px',
};
const defaultProps = {
  backgroundColor: 'gray.300',
  mx: '10px',
  cursor: 'pointer',
};

export const SliderStep = ({ current, onClick }: SliderStepProps) => {
  const stepProps = current ? currentDotProps : defaultProps;
  const selectStep = () => !current && onClick();

  return (
    <Circle
      size="12px"
      boxSizing="content-box"
      onClick={selectStep}
      role="tab"
      tabIndex={0}
      aria-selected={current}
      {...stepProps}
    />
  );
};
