import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { keyframes } from '@coderscamp/ui/components/Keyframes';
import { SolidGitHubIcon } from '@coderscamp/ui/icons';

interface TechCarouselProps {
  direction?: 'normal' | 'reverse';
}

export const TechCarousel = ({ direction = 'normal' }: TechCarouselProps) => {
  const spin = keyframes`
   0%    { left: 0; }
  100%  { left: -200%; }
`;
  const animation = `${spin} infinite 60s linear ${direction}`;

  return (
    <Box
      w="100%"
      bg="gray.100"
      h="140px"
      sx={{ position: 'relative', overflow: 'hidden', transform: 'translate3d(0, 0, 0)' }}
    >
      <Flex
        w="300%"
        h="100%"
        align="center"
        justify="space-between"
        animation={animation}
        sx={{ position: 'absolute', top: 0, left: 0, transform: 'translate3d(0, 0, 0)' }}
      >
        <IconButton icon={<SolidGitHubIcon />} size="lg" aria-label="Chat Icon Button" />
        <IconButton icon={<SolidGitHubIcon />} size="lg" aria-label="Chat Icon Button" />
        <IconButton icon={<SolidGitHubIcon />} size="lg" aria-label="Chat Icon Button" />
        <IconButton icon={<SolidGitHubIcon />} size="lg" aria-label="Chat Icon Button" />
      </Flex>
    </Box>
  );
};
