import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { Statistic } from './Statistic';

interface StatsWithTitleProps {
  amounts: string[];
  labels: string[];
}

export const StatsWithTitle = ({ amounts, labels }: StatsWithTitleProps) => {
  const statisticStackDirection = useBreakpointValue({ base: 'column', xl: 'row' } as const);
  const statisticFlexDirection = useBreakpointValue({ base: 'column', md: 'row' } as const);
  const statisticSize = useBreakpointValue({ xl: 'min(1120px, 100%)', md: 'min(850px, 100%)' } as const);

  const stackProps = { direction: statisticStackDirection, width: statisticSize };
  const flexProps = { direction: statisticFlexDirection, width: statisticSize };

  return (
    <VStack spacing="32px" width="100%">
      <Typography size="md" color="gray.400" weight="bold">
        BIEŻĄCA EDYCJA
      </Typography>
      <Stack {...stackProps}>
        <Flex {...flexProps}>
          <Statistic amount={amounts[0]} label={labels[0]} pb="32px" />
          <Statistic amount={amounts[1]} label={labels[1]} pb="32px" />
        </Flex>
        <Flex {...flexProps}>
          <Statistic amount={amounts[2]} label={labels[2]} pb="32px" />
          <Statistic amount={amounts[3]} label={labels[3]} />
        </Flex>
      </Stack>
    </VStack>
  );
};
