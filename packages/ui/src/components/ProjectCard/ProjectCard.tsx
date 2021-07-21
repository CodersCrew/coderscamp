import React from 'react';
import { Box, Flex, forwardRef, Image, Spacer } from '@chakra-ui/react';

import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

type StatusProps = 'idle' | 'doing' | 'review' | 'done';

type ImageProps = string;
type Title = string;
type Url = string;
type Points = number;
type PointsMax = number;

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
    image: ImageProps;
    title: Title;
    url: Url;
  },
  'status',
  | {
      status: 'idle' | 'doing' | 'review';
      date: string;
    }
  | {
      status: 'done';
      points: Points;
      pointsMax: PointsMax;
    }
>;

export const ProjectCard = forwardRef<ProjectCardType, 'div'>(({ status, image, title, url, ...props }, ref) => {
  let statusText;
  let timeStatus;
  let dateOrPointsText: any;

  const goToProject = () => {
    console.log(url);
  };

  if (status === 'done') {
    statusText = 'Zakończony';
    timeStatus = 'Punkty';
    dateOrPointsText = `${props.points}/${props.pointsMax}`;
  }
  if (status === 'doing') {
    statusText = 'W trakcie';
    timeStatus = 'Deadline';
    dateOrPointsText = props.date;
  }
  if (status === 'review') {
    statusText = 'W ocenie';
    timeStatus = 'Demo';
    dateOrPointsText = props.date;
  }
  if (status === 'idle') {
    statusText = 'Nie rozpoczęty';
    timeStatus = 'Rozpoczecie';
    dateOrPointsText = props.date;
  }

  return (
    <Box status={status} ref={ref} w="100%" h="50vh" boxShadow="base" {...props}>
      <Flex flexDirection="column" justifyContent="space-between" h="100%">
        <Image src={image} alt="" />
        <Spacer />
        <Typography as="p" fontWeight="700">
          {title}
        </Typography>
        <Spacer />
        <Flex justifyContent="space-between">
          <Typography as="span">Status:</Typography>
          <Typography as="span">{statusText}</Typography>
        </Flex>
        <Spacer />
        <Flex justifyContent="space-between">
          <Typography as="span">{timeStatus}:</Typography>
          <Typography as="span">{dateOrPointsText}</Typography>
        </Flex>
        <Spacer />
        <Button onClick={goToProject}>Przejdź do projektu</Button>
      </Flex>
    </Box>
  );
});
