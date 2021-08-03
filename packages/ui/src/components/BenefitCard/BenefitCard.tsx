import React, { ReactElement } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { Typography } from '../Typography';

export interface BenefitCardProps extends BoxProps {
  icon: ReactElement;
  title?: string;
  subtitle?: string;
}

export const BenefitCard = ({ icon, title, subtitle, ...props }: BenefitCardProps) => {
  return (
    <Box
      bg="gray.50"
      borderRadius="8px"
      p="32px"
      w="100%"
      minHeight="248px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      pos="relative"
      {...props}
    >
      <Box
        bg="brand.500"
        color="white"
        borderRadius="6px"
        w="56px"
        h="56px"
        pos="absolute"
        top="-26px"
        fontSize="32px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>
      <Typography size="lg" weight="medium" mb="16px">
        {title}
      </Typography>
      <Typography size="md">{subtitle}</Typography>
    </Box>
  );
};
