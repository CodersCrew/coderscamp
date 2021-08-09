import React, { ReactText } from 'react';
import { Flex } from '@chakra-ui/react';

import { SolidCheckIcon } from '../../icons/SolidCheck';
import { Typography } from '../Typography';

export type RequirementProps = {
  children: ReactText;
};

export const Requirement = ({ children }: RequirementProps) => {
  return (
    <Flex>
      <SolidCheckIcon w="48px" h="48px" color="green.500" mr="16px" />
      <Typography color="gray.700" size="lg" weight="normal">
        {children}
      </Typography>
    </Flex>
  );
};
