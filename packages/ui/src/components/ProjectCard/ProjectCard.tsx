import React from 'react';
import { Box, Flex, forwardRef, Grid } from '@chakra-ui/react';

import { statusValueCheck } from '../../helpers/statusValueCheck';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

type DoneProps = {
  status: 'done';
  points: number;
  pointsMax: number;
  date?: never;
};

type NotDoneProps = {
  status: 'idle' | 'doing' | 'review';
  date: Date;
  points?: never;
  pointsMax?: never;
};

type CommonProps = {
  image: string;
  title: string;
  url: string;
};

export type ProjectCardProps = CommonProps & (DoneProps | NotDoneProps);

export const ProjectCard = forwardRef<ProjectCardProps, 'div'>(
  // disabled for url props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ status, image, title, url, points, pointsMax, date, ...props }, ref) => {
    const { statusText, timeStatus, dateOrPoints, isDoing } = statusValueCheck(
      status,
      points as number,
      pointsMax as number,
      date as Date,
    );

    return (
      <Box status={status} ref={ref} w="100%" h="100%" boxShadow="base" borderRadius="8px" {...props}>
        <Grid templateRows="repeat(2, 1fr)" h="100%" gap="24px">
          <Box as="img" src={image} alt="" background="gray.300" borderRadius="8px 8px 0 0" h="auto" />

          <Grid templateRows="repeat(3 1fr)" justifyContent="center">
            <Typography as="p" fontWeight="700" size="lg" lineHeight="xl" letterSpacing="4xl">
              {title}
            </Typography>

            <Flex justifyContent="space-between" alignSelf="end">
              <Typography lineHeight="md" fontWeight="500" as="span">
                Status:
              </Typography>
              <Typography lineHeight="md" as="span">
                {statusText}
              </Typography>
            </Flex>

            <Flex justifyContent="space-between" alignSelf="start">
              <Typography lineHeight="md" fontWeight="500" as="span">
                {timeStatus}:
              </Typography>
              <Typography lineHeight="md" as="span">
                {dateOrPoints}
              </Typography>
            </Flex>

            {isDoing ? <Button>Przejdź do projektu</Button> : <Button disabled>Przejdź do projektu</Button>}
          </Grid>
        </Grid>
      </Box>
    );
  },
);
