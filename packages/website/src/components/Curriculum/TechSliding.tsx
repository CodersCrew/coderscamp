import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';

import { techNamesTop } from './Curriculum.data';
import { animation } from './TechSlidingAnimation';

type TechSlidingProps = {
  techIconsArray?: {
    name: string;
    value: JSX.Element;
  }[];
  isAnimationReverse?: 'reverse' | 'normal';
};

export const TechSliding = ({ techIconsArray = techNamesTop, isAnimationReverse = 'normal' }: TechSlidingProps) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Box w="100%" bg="gray.100" h={{ base: '90px', lg: '140px' }} sx={{ position: 'relative', overflow: 'hidden' }}>
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-evenly"
        animation={`${animation} ${isLargerThan768 ? '20s' : '10s'} ${isAnimationReverse} `}
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
