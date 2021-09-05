import React, { useMemo } from 'react';
import { useWindowDimensions } from 'src/hooks/useWindowDimensions';

import { Box } from '@coderscamp/ui/components/Box';
import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { keyframes } from '@coderscamp/ui/components/Keyframes';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import type { TechIcon } from './Curriculum.data';

export interface TechSlidingProps {
  techIcons: TechIcon[];
  reverse?: boolean;
}

const sliding = keyframes`
  100% {
    transform: translateX(-50%);
  }
`;
const animation = `${sliding} linear infinite 60s`;

export const TechSliding = ({ techIcons, reverse }: TechSlidingProps) => {
  const { width } = useWindowDimensions();
  const iconSize = useBreakpointValue({ base: 48, lg: 80 }) ?? 80;
  const icons = useMemo(
    () => [...techIcons, ...techIcons].map((icon, i) => ({ ...icon, key: icon.name + i })),
    [techIcons],
  );

  const gapSize = iconSize;
  const sliderWidth = Math.round((100 * (iconSize * icons.length + gapSize * (icons.length - 1))) / (width ?? 1920));

  return (
    <Box w="100%" bg="gray.100" h={{ base: '96px', lg: '160px' }} position="relative" overflow="hidden">
      <Flex
        style={{ width: `${sliderWidth}%` }}
        h="100%"
        align="center"
        justify="space-around"
        animation={`${animation} ${reverse ? 'reverse' : 'normal'}`}
        position="absolute"
        top={0}
        left={0}
        transform="translate3d(0, 0, 0)"
      >
        {icons.map((tech) => (
          <Center fontSize={`${iconSize}px`} key={tech.key}>
            {tech.value}
          </Center>
        ))}
      </Flex>
    </Box>
  );
};
