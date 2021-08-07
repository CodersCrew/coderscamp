import React from 'react';

import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { Statistic } from './Statistic';

interface StatsWithTitleProps {
  amounts: string[];
  labels: string[];
  title: string;
}

export const StatsWithTitle = ({ amounts, labels, title }: StatsWithTitleProps) => {
  const statisticSize = useBreakpointValue({ md: 'min(850px, 100%)', xl: 'min(1120px, 100%)' } as const);

  return (
    <VStack spacing="32px" width={statisticSize}>
      <Typography size="md" color="gray.400" weight="bold">
        {title}
      </Typography>
      <SimpleGrid
        columns={{ xl: 4, lg: 4, md: 2, sm: 1 }}
        spacingX={{ lg: '32px' }}
        spacingY={{ base: '72px' }}
        width="100%"
      >
        <Statistic amount={amounts[0]} label={labels[0]} />
        <Statistic amount={amounts[1]} label={labels[1]} />
        <Statistic amount={amounts[2]} label={labels[2]} />
        <Statistic amount={amounts[3]} label={labels[3]} />
      </SimpleGrid>
    </VStack>
  );
};
