import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';

import { techNames, techNamesBottom } from './Curriculum.data';
import { animation } from './TechSlidingAnimation';

export const TechSlidingTop = () => {
  return (
    <Box w="100%" bg="gray.100" h={{ base: '100px', lg: '140px' }} sx={{ position: 'relative', overflow: 'hidden' }}>
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-evenly"
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

export const TechSlidingBottom = () => {
  return (
    <Box w="100%" bg="gray.100" h={{ base: '100px', lg: '140px' }} sx={{ position: 'relative', overflow: 'hidden' }}>
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-evenly"
        animation={`${animation} reverse`}
        sx={{ position: 'absolute', top: 0, left: 0, transform: 'translateX(0)' }}
      >
        {techNamesBottom.map((tech) => (
          <Box fontSize={{ base: '52px', lg: '78px' }} px={{ base: '32px', lg: 0 }} key={tech.name}>
            {tech.value}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
