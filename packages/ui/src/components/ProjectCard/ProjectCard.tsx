import React from 'react';
import { Box, Flex, forwardRef, Grid, Image } from '@chakra-ui/react';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { statusValueCheck } from './statusValueCheck';

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
    const { statusText, timeStatus, dateOrPoints } = statusValueCheck(
      status,
      points as number,
      pointsMax as number,
      date as Date,
    );

    return (
      <Box ref={ref} w="100%" boxShadow="base" borderRadius="8px" {...props}>
        <Grid templateRows="min-content 1fr" h="100%">
          <Image
            src={image}
            alt={`Grafika projektu z modułu ${title}`}
            background="gray.300"
            borderRadius="8px 8px 0 0"
            h="auto"
          />

          <Grid templateRows="repeat(4, 1fr)" padding="24px">
            <Typography as="p" fontWeight="700" size="lg">
              {title}
            </Typography>

            <Flex justifyContent="space-between" alignSelf="end">
              <Typography fontWeight="500" as="span">
                Status:
              </Typography>
              <Typography as="span">{statusText}</Typography>
            </Flex>

            <Flex justifyContent="space-between" alignSelf="start">
              <Typography fontWeight="500" as="span">
                {timeStatus}:
              </Typography>
              <Typography as="span">{dateOrPoints}</Typography>
            </Flex>
            <Button disabled={status === 'idle'}>Przejdź do projektu</Button>
          </Grid>
        </Grid>
      </Box>
    );
  },
);
