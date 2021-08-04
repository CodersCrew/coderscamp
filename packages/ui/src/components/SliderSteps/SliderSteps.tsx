import React from 'react';
import { Box } from '@chakra-ui/react';

import { OutlinedArrowLeft, OutlinedArrowRight } from '../../icons';
import { SliderStep } from './SliderStep';

export interface SliderStepsProps {
  count: number;
  selectedIdx: number;
  onChangeIdx: (newIdx: number) => void;
}

export const SliderSteps = ({ count, selectedIdx, onChangeIdx }: SliderStepsProps) => {
  return (
    <Box display="flex">
      <OutlinedArrowLeft />
      {[...Array(count).keys()].map((idx) => (
        <SliderStep key={idx} isSelected={selectedIdx === idx} />
      ))}
      <OutlinedArrowRight />
    </Box>
  );
};
