import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { keyframes } from '@coderscamp/ui/components/Keyframes';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { techNamesTop } from './Curriculum.data';

type TechSlidingProps = {
  techIconsArray?: {
    name: string;
    value: JSX.Element;
  }[];
  isAnimationReverse?: 'reverse' | 'normal';
};

const sliding = keyframes`
   100% {
    transform: translateX(-66.66%);
  }
`;
const animation = `${sliding} linear infinite`;

export const TechSliding = ({ techIconsArray = techNamesTop, isAnimationReverse = 'normal' }: TechSlidingProps) => {
  const animationDuration = useBreakpointValue({ base: '10s', md: '20s' });

  return (
    <Box w="100%" bg="gray.100" h={{ base: '90px', lg: '140px' }} sx={{ position: 'relative', overflow: 'hidden' }}>
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-evenly"
        animation={`${animation} ${animationDuration} ${isAnimationReverse} `}
        sx={{ position: 'absolute', top: 0, left: 0, transform: 'translateX(0)' }}
      >
        {techIconsArray.map((tech) => (
          <Flex fontSize={{ base: '52px', lg: '78px' }} px={{ base: '32px', lg: 0 }} key={tech.name}>
            {tech.value}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
