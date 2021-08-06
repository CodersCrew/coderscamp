import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Typography } from '@coderscamp/ui/components/Typography';

interface StatisticProps {
  amount: string;
  label: string;
  pb?: string;
}

export const Statistic = ({ amount, label, pb }: StatisticProps) => {
  return (
    <Box textAlign="center" flex="1" pb={pb}>
      <Typography size="5xl" color="brand.500" fontWeight="bold">
        {amount}
      </Typography>
      <Typography size="lg" color="gray.500" fontWeight="medium">
        {label}
      </Typography>
    </Box>
  );
};
