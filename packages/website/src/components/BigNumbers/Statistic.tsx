import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Typography } from '@coderscamp/ui/components/Typography';

export interface StatisticProps {
  amount: string;
  label: string;
}

export const Statistic = ({ amount, label }: StatisticProps) => {
  return (
    <Box textAlign="center">
      <Typography size="5xl" color="brand.500" fontWeight="bold">
        {amount}
      </Typography>
      <Typography size="lg" color="gray.500" fontWeight="medium">
        {label}
      </Typography>
    </Box>
  );
};
