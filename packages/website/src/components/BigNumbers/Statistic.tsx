import React from 'react';
import { Box, HTMLChakraProps } from '@chakra-ui/react';

import { Typography } from '@coderscamp/ui/components/Typography';

interface StatisticProps extends HTMLChakraProps<'div'> {
  amount: string;
  label: string;
}

export const Statistic = ({ amount, label, ...props }: StatisticProps) => {
  return (
    <Box textAlign="center" flex="1" {...props}>
      <Typography size="5xl" color="brand.500" fontWeight="800">
        {amount}
      </Typography>
      <Typography size="lg" color="gray.500" fontWeight="500">
        {label}
      </Typography>
    </Box>
  );
};
