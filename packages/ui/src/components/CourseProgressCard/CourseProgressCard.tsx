import React from 'react';
import { Box, BoxProps, Progress } from '@chakra-ui/react';

import { Flex } from '../Flex';
import { Typography } from '../Typography';

interface Statistic {
  name: string;
  value: number;
  max: number;
}

export interface CourseProgressCardProps extends BoxProps {
  stats: Statistic[];
}

export const CourseProgressCard = ({ stats, ...props }: CourseProgressCardProps) => {
  return (
    <Box w="100%" boxShadow="base" borderRadius="8px" padding="24px" {...props}>
      <Flex direction="column" justify="space-between" h="100%">
        <Typography as="p" weight="extrabold" size="xl" color="gray.900">
          Postęp w kursie
        </Typography>
        {stats.map((value) => {
          return (
            <Flex direction="column" key={value.name}>
              <Flex justify="space-between" pt="24px">
                <Typography as="p" weight="medium" size="sm" color="gray.900" mb="4px">
                  {value.name}
                </Typography>
                <Typography as="p" size="sm" color="gray.400">{`(${value.value}/${value.max})`}</Typography>
              </Flex>
              <Progress value={value.value} max={value.max} borderRadius="2px" />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
