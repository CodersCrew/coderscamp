import React, { ReactElement, useState } from 'react';
import { Center, CenterProps } from '@chakra-ui/react';

import { useBreakpointValue } from '../../hooks/useBreakpointValue';
import { Typography } from '../Typography';

export interface BenefitCardProps extends CenterProps {
  icon: ReactElement;
  title?: string;
  subtitle?: string;
}

export const BenefitCard = ({ icon, title, subtitle, ...props }: BenefitCardProps) => {
  const [hovered, setHovered] = useState(false);
  const titleSize = useBreakpointValue({ base: 'md', md: 'lg' } as const);
  const subtitleSize = useBreakpointValue({ base: 'sm', md: 'md' } as const);
  const iconWrapperSize = useBreakpointValue({ base: '48px', md: '56px' } as const);
  const iconSize = useBreakpointValue({ base: '24px', md: '32px' } as const);
  const wrapperPaddingTop = useBreakpointValue({ base: '44px', md: '52px' } as const);
  const wrapperPaddingBottom = useBreakpointValue({ base: '40px', md: '80px' } as const);

  return (
    <Center
      bg="gray.50"
      borderRadius="8px"
      pt={wrapperPaddingTop}
      pb={wrapperPaddingBottom}
      px="24px"
      w="100%"
      minHeight="248px"
      maxWidth="400px"
      flexDirection="column"
      textAlign="center"
      pos="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <Center
        bg="brand.500"
        color="white"
        borderRadius="6px"
        w={iconWrapperSize}
        h={iconWrapperSize}
        pos="absolute"
        top="-26px"
        fontSize={iconSize}
        boxShadow={hovered ? 'lg' : 'none'}
        transition="ease-in-out"
        transitionDuration="0.3s"
      >
        {icon}
      </Center>
      <Typography size={titleSize} color="gray.900" weight="medium" mb="16px">
        {title}
      </Typography>
      <Typography size={subtitleSize} color="gray.700">
        {subtitle}
      </Typography>
    </Center>
  );
};
