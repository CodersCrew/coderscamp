import React, { ReactElement, useState } from 'react';
import { BoxProps, Center } from '@chakra-ui/react';

import { Typography } from '../Typography';

export interface BenefitCardProps extends BoxProps {
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
      pt="52px"
      pb="80px"
      px="24px"
      w="100%"
      minHeight="248px"
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
        w="56px"
        h="56px"
        pos="absolute"
        top="-26px"
        fontSize="32px"
        boxShadow={hovered ? 'lg' : 'none'}
        transition="ease-in-out"
        transitionDuration="0.3s"
      >
        {icon}
      </Center>
      <Typography size="lg" color="gray.900" weight="medium" mb="16px">
        {title}
      </Typography>
      <Typography size="md" color="gray.700">
        {subtitle}
      </Typography>
    </Center>
  );
};
