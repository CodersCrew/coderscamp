import React from 'react';

import { Center, CenterProps } from '@coderscamp/ui/components/Center';
import { StackProps, VStack } from '@coderscamp/ui/components/Stack';

export interface SectionProps extends CenterProps {
  spacing: StackProps['spacing'];
  fullWidth?: boolean;
}

export const Section = ({ children, spacing, fullWidth, ...props }: SectionProps) => {
  const vStackStyles = fullWidth
    ? { width: '100%' }
    : {
        px: { base: '16px', sm: '32px', md: '64px', lg: 0 },
        w: { base: '100%', lg: '920px', xl: '1080px', '2xl': '1280px' },
      };

  return (
    <Center py={{ base: '48px', lg: '80px' }} width="100%" {...props}>
      <VStack spacing={spacing} {...vStackStyles}>
        {children}
      </VStack>
    </Center>
  );
};
