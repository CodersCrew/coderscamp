import React from 'react';
import Image from 'next/image';

import { Box, BoxProps } from '@coderscamp/ui/components/Box';

interface MentorAvatarProps extends BoxProps {
  src: string;
  alt: string;
}

export const MentorAvatar = ({ alt, src }: MentorAvatarProps) => {
  return (
    <Box width="64px" height="64px" borderWidth="1px" borderColor="gray.300" borderRadius="100%" overflow="hidden">
      <Image src={src} alt={alt} width={64} height={64} layout="fixed" />
    </Box>
  );
};
