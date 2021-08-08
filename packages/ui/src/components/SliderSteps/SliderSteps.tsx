import React from 'react';
import { Center } from '@chakra-ui/react';

import { OutlinedArrowLeftIcon, OutlinedArrowRightIcon } from '../../icons';
import { IconButton } from '../IconButton';
import { SliderStep } from './SliderStep';

export interface SliderStepsProps {
  count: number;
  selectedIndex: number;
  onChange: (newIdx: number) => void;
}

const arrowStyles = {
  variant: 'ghost',
  size: 'sm',
} as const;

export const SliderSteps = ({ count, selectedIndex, onChange }: SliderStepsProps) => {
  const lastIdx = count - 1;
  const goForward = () => onChange(selectedIndex !== lastIdx ? selectedIndex + 1 : 0);
  const goBack = () => onChange(selectedIndex !== 0 ? selectedIndex - 1 : lastIdx);
  const goToSelected = (index: number) => onChange(index);

  if (selectedIndex < 0 || selectedIndex >= count)
    throw new Error('SelectedIndex property should be positive number and less than count of dots');

  return (
    <Center width="max-content" role="tablist">
      <IconButton icon={<OutlinedArrowLeftIcon />} {...arrowStyles} onClick={goBack} aria-label="go back button" />
      {[...Array(count).keys()].map((index) => (
        <SliderStep key={index} current={selectedIndex === index} onClick={() => goToSelected(index)} />
      ))}
      <IconButton
        icon={<OutlinedArrowRightIcon />}
        {...arrowStyles}
        onClick={goForward}
        aria-label="go forward button"
      />
    </Center>
  );
};
