import React, { ReactElement } from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { Typography } from '@coderscamp/ui/components/Typography';

interface ScheduleContainerProps {
  title: string;
  children: ReactElement;
}

export const ScheduleContainer = ({ title, children }: ScheduleContainerProps) => {
  return (
    <Center flexDirection="column" mx="auto" w="100%" mt="120px" mb="80px">
      <Typography size="4xl" weight="extrabold" m="64px 0" textAlign="center">
        {title}
      </Typography>
      {children}
    </Center>
  );
};
