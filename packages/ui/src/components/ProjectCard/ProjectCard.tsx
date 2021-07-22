import React from 'react';
import { Box, Flex, forwardRef, Grid } from '@chakra-ui/react';

import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

export type StatusProps = 'idle' | 'doing' | 'review' | 'done';

type RemoveCommonValues<Type, TOmit> = {
  [Property in keyof Type]: TOmit extends Record<Property, infer U> ? Exclude<Type[Property], U> : Type[Property];
};

type Id<Type> = Record<string, unknown> & { [P in keyof Type]: Type[P] };

type ConditionalProps<Type, TKey extends keyof TCase, TCase extends Partial<Type>> =
  | Id<Omit<Type, keyof TCase> & TCase>
  | Id<RemoveCommonValues<Type, Pick<TCase, TKey>>>;

export type ProjectCardType = ConditionalProps<
  {
    status: StatusProps;
    image: string;
    title: string;
    url: string;
  },
  'status',
  | {
      status: 'idle' | 'doing' | 'review';
      date: Date;
    }
  | {
      status: 'done';
      points: number;
      pointsMax: number;
    }
>;

export const ProjectCard = forwardRef<ProjectCardType, 'div'>(
  ({ status, image, title, url, points, pointsMax, date, ...props }, ref) => {
    const dateProps = date as Date;
    let statusText;
    let timeStatus;
    let dateOrPointsText;
    let isDoing = true;

    if (status === 'idle') {
      statusText = 'Nie rozpoczęty';
      timeStatus = 'Rozpoczecie';
      dateOrPointsText = dateProps.toLocaleDateString();
      isDoing = false;
    }
    if (status === 'doing') {
      statusText = 'W trakcie';
      timeStatus = 'Deadline';
      dateOrPointsText = dateProps.toLocaleDateString();
    }
    if (status === 'review') {
      statusText = 'W ocenie';
      timeStatus = 'Demo';
      dateOrPointsText = dateProps.toLocaleDateString();
    }
    if (status === 'done') {
      statusText = 'Zakończony';
      timeStatus = 'Punkty';
      dateOrPointsText = `${points}/${pointsMax}`;
    }

    return (
      <Box status={status} ref={ref} w="100%" boxShadow="base" borderRadius="8px" {...props}>
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
                {dateOrPointsText}
              </Typography>
            </Flex>

            {isDoing ? <Button>Przejdź do projektu</Button> : <Button disabled>Przejdź do projektu</Button>}
          </Grid>
        </Grid>
      </Box>
    );
  },
);
