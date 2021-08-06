import React from 'react';
import { Box } from '@chakra-ui/react';

export interface SliderStepProps {
  current: boolean;
}

export const SliderStep = ({ current }: SliderStepProps) => {
  const bgColor = current ? 'brand.500' : 'gray.300';
  const horizontalMargin = current ? '2px' : '10px';

  return (
    <Box
      data-testid={current ? 'currentSliderStep' : 'baseSliderStep'}
      borderRadius="50%"
      backgroundColor={bgColor}
      my="0px"
      mx={horizontalMargin}
      w="12px"
      h="12px"
      boxSizing="content-box"
      {...(current && { borderColor: 'brand.200', borderWidth: '4px' })}
    />
  );
};
