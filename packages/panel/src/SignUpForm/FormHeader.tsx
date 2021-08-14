import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

interface Props {
  step: number;
  title: string;
  subtitle: string;
}

export const FormHeader: React.FC<Props> = ({ step, title, subtitle }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" paddingTop="32px">
      <Typography size="sm" color="gray.900">
        Krok {step} z 3
      </Typography>
      <Typography size="2xl" color="gray.900">
        {title}
      </Typography>
      <Typography size="md" color="gray.500" padding="8px 22px 0 22px" textAlign="center">
        {subtitle}
      </Typography>
    </Flex>
  );
};
