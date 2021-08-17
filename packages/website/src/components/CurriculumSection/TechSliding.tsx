import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { keyframes } from '@coderscamp/ui/components/Keyframes';

import { techNames } from './TechIcons';

interface TechSlidingProps {
  direction?: 'normal' | 'reverse';
}

export const TechSliding = ({ direction = 'normal' }: TechSlidingProps) => {
  const sliding = keyframes`
   100% {
    transform: translateX(-66.6666%);
  }
`;
  const animation = `${sliding} infinite 60s linear ${direction}`;

  return (
    <Box w="100%" bg="gray.100" h="140px" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-between"
        animation={animation}
        sx={{ position: 'absolute', top: 0, left: 0, transform: 'translateX(0)' }}
      >
        {techNames.map((tech) => (
          <Box fontSize={{ base: '52px', lg: '78px' }} px={{ base: '32px', lg: 0 }} key={tech.name}>
            {tech.value}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
