import React from 'react';

import { BenefitCard } from '@coderscamp/ui/components/BenefitCard';
import { Center } from '@coderscamp/ui/components/Center';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { benefits } from './MentorBenefits.data';

export const MentorBenefits = () => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);

  return (
    <Center
      flexDirection="column"
      bg="white"
      py={{ base: '40px', lg: '80px' }}
      px={{ base: '16px', sm: '32px', lg: '64px' }}
      textAlign="center"
    >
      <Typography
        size={{ base: '3xl', lg: '4xl' }}
        color="gray.900"
        weight="extrabold"
        mb={{ base: '80px', lg: '92px' }}
      >
        Dlaczego warto zostać mentorem?
      </Typography>
      <Grid templateColumns={`repeat(${columnsCount}, 1fr)`} gap="64px 40px">
        {benefits.map(({ ...props }) => (
          <BenefitCard key={props.title} {...props} />
        ))}
      </Grid>
    </Center>
  );
};
