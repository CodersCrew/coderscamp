import React, { ReactElement, useState } from 'react';
import { Center, CenterProps } from '@chakra-ui/react';

import { Typography } from '../Typography';

export interface BenefitCardProps extends CenterProps {
  icon: ReactElement;
  title?: string;
  subtitle?: string;
}

export const BenefitCard = ({ icon, title, subtitle, ...props }: BenefitCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Center
      bg="gray.50"
      borderRadius="8px"
      pt={{ base: '44px', md: '52px' }}
      pb={{ base: '40px', md: '80px' }}
      px="24px"
      w="100%"
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
        w={{ base: '48px', md: '56px' }}
        h={{ base: '48px', md: '56px' }}
        pos="absolute"
        top="-26px"
        fontSize={{ base: '24px', md: '32px' }}
        boxShadow={hovered ? 'lg' : 'none'}
        transition="ease-in-out"
        transitionDuration="0.3s"
      >
        {icon}
      </Center>
      <Typography size={{ base: 'md', md: 'lg' }} color="gray.900" weight="medium" mb="16px">
        {title}
      </Typography>
      <Typography size={{ base: 'sm', md: 'md' }} color="gray.700">
        {subtitle}
      </Typography>
    </Center>
  );
};
