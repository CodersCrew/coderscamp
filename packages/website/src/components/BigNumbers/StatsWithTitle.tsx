import React from 'react';

import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { Statistic, StatisticProps } from './Statistic';

interface StatsWithTitleProps {
  statistics: StatisticProps[];
  title: string;
}

export const StatsWithTitle = ({ statistics, title }: StatsWithTitleProps) => {
  const statisticSize = useBreakpointValue({ md: 'min(850px, 100%)', xl: 'min(1120px, 100%)' } as const);

  return (
    <VStack spacing="32px" width={statisticSize}>
      <Typography size="md" color="gray.400" weight="bold">
        {title}
      </Typography>
      <SimpleGrid columns={{ xl: 4, lg: 4, md: 2, sm: 1 }} spacingX="32px" spacingY="72px" width="100%">
        {statistics.map(({ amount, label }) => (
          <Statistic amount={amount} label={label} key={label} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
