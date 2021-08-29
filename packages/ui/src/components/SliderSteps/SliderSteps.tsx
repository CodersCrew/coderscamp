import React from 'react';
import { Center } from '@chakra-ui/react';

import { OutlinedArrowLeftIcon } from '../../icons/OutlinedArrowLeft';
import { OutlinedArrowRightIcon } from '../../icons/OutlinedArrowRight';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import { SliderStep } from './SliderStep';

export interface SliderStepsProps {
  count: number;
  selectedIndex: number;
  onChange: (newIdx: number) => void;
  showDots?: boolean;
}

const arrowStyles = {
  variant: 'ghost',
  size: 'sm',
} as const;

export const SliderSteps = ({ count, selectedIndex, onChange, showDots = true }: SliderStepsProps) => {
  const lastIdx = count - 1;
  const goForward = () => onChange(selectedIndex !== lastIdx ? selectedIndex + 1 : 0);
  const goBack = () => onChange(selectedIndex !== 0 ? selectedIndex - 1 : lastIdx);
  const goToSelected = (index: number) => onChange(index);

  if (selectedIndex < 0 || selectedIndex >= count) {
    throw new Error(
      `SelectedIndex property should be should be in range between 0 to ${lastIdx} (count - 1), but was ${selectedIndex}`,
    );
  }

  return (
    <Center width="max-content" role="tablist">
      <IconButton
        w="40px"
        h="40px"
        icon={<OutlinedArrowLeftIcon />}
        {...arrowStyles}
        onClick={goBack}
        aria-label="go back button"
      />
      {showDots ? (
        [...Array(count).keys()].map((index) => (
          <SliderStep key={index} current={selectedIndex === index} onClick={() => goToSelected(index)} />
        ))
      ) : (
        <Typography mx="16px" color="gray.700">
          {selectedIndex + 1} / {count}
        </Typography>
      )}
      <IconButton
        w="40px"
        h="40px"
        icon={<OutlinedArrowRightIcon />}
        {...arrowStyles}
        onClick={goForward}
        aria-label="go forward button"
      />
    </Center>
  );
};
