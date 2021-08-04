import React from 'react';

export interface SliderStepProps {
  isSelected: boolean;
}

export const SliderStep = ({ isSelected }: SliderStepProps) => {
  return <p> X{isSelected} </p>;
};
