import React, { ComponentType } from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Counter } from '@coderscamp/ui/components/Counter';
import { Typography, TypographyProps } from '@coderscamp/ui/components/Typography';

export interface StatisticProps {
  amount: string;
  label: string;
  children: ComponentType<TypographyProps>;
}

export const Statistic = ({ amount, label }: StatisticProps) => {
  return (
    <Box textAlign="center">
      <Counter valueFrom={0} valueTo={amount} size="5xl" color="brand.500" totalDuration={1.5} weight="bold" />
      <Typography size="lg" color="gray.500" weight="medium">
        {label}
      </Typography>
    </Box>
  );
};
