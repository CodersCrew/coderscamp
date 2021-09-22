import React, { ReactElement } from 'react';

import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from '../Section';

interface ScheduleContainerProps {
  title: string;
  children: ReactElement;
}

export const ScheduleContainer = ({ title, children }: ScheduleContainerProps) => {
  return (
    <Section spacing="64px">
      <Typography size="4xl" weight="extrabold" textAlign="center" color="gray.900">
        {title}
      </Typography>
      {children}
    </Section>
  );
};
