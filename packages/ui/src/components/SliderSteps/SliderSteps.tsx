import React from 'react';
import { Center } from '@chakra-ui/react';

import { OutlinedArrowLeftIcon, OutlinedArrowRightIcon } from '../../icons';
import { SliderStep } from './SliderStep';

export interface SliderStepsProps {
  count: number;
  selectedIdx: number;
  onChangeIdx: (newIdx: number) => void;
}

export const SliderSteps = ({ count, selectedIdx, onChangeIdx }: SliderStepsProps) => {
  const lastIdx = count - 1;
  const arrowStyles = {
    w: '32px',
    h: '32px',
    p: '6px',
    borderRadius: '6px',
    color: 'gray.800',
  };

  return (
    <Center width="max-content">
      <OutlinedArrowLeftIcon
        {...arrowStyles}
        onClick={() => onChangeIdx(selectedIdx !== 0 ? selectedIdx - 1 : lastIdx)}
      />
      {[...Array(count).keys()].map((idx) => (
        <SliderStep key={idx} current={selectedIdx === idx} />
      ))}
      <OutlinedArrowRightIcon
        {...arrowStyles}
        onClick={() => onChangeIdx(selectedIdx !== lastIdx ? selectedIdx + 1 : 0)}
      />
    </Center>
  );
};
