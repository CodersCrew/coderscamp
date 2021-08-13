import React from 'react';

import { Box, BoxProps } from '../Box';
import { Button } from '../Button';
import { Link } from '../Link';
import { Typography } from '../Typography';
import { BUTTON_TEXT, MAIN_TITLE } from './EventsCard.mocks';

export type Event = {
  id: number;
  title: string;
  date: Date | { from: Date; to: Date };
  description: string;
  url: string;
};

export type EventCardProps = { events: Event[] } & BoxProps;

const addZeroToDateValue = (dateValue: number): string => {
  if (dateValue === undefined) {
    return '';
  }

  return dateValue >= 10 ? `${dateValue}` : `0${dateValue}`;
};

const getDayAndMonth = (date: Date): string => {
  if (date === undefined) {
    return '';
  }

  return `${addZeroToDateValue(date.getDate())}.${addZeroToDateValue(date.getMonth() + 1)}`;
};

const getHourAndMinute = (date: Date): string => {
  if (date === undefined) {
    return '';
  }

  return `${addZeroToDateValue(date.getHours())}:${addZeroToDateValue(date.getMinutes())}`;
};

export const EventsCard = ({ events, ...props }: EventCardProps) => {
  return (
    <Box width="100%" borderRadius={8} padding="32px" boxShadow="base" backgroundColor="white" {...props}>
      <Typography size="xl" color="gray.900" fontWeight={800} lineHeight="28px" mb="24px">
        {MAIN_TITLE}
      </Typography>
      {(events || []).map(({ id, title, date, description, url }: Event, index: number) => (
        <Box
          key={id}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          w="100%"
          mb={index !== events.length - 1 ? '32px' : '0px'}
          data-testid="event"
        >
          <Typography data-testid="eventDate" size="5xl" lineHeight="48px" color="gray.900" fontWeight={400} mr="20px">
            {date && 'from' in date ? getDayAndMonth(date.from) : getDayAndMonth(date)}
          </Typography>
          <Box maxW="570px">
            <Typography data-testid="eventTitle" size="lg" lineHeight="28px" color="gray.900" fontWeight={700}>
              {title}
            </Typography>
            <Typography data-testid="eventHours" size="sm" lineHeight="20px" color="gray.500" fontWeight={500} mb="8px">
              {date && 'from' in date && 'to' in date
                ? `${getHourAndMinute(date.from)}-${getHourAndMinute(date.to)}`
                : getHourAndMinute(date)}
            </Typography>
            <Typography
              data-testid="eventDescription"
              size="md"
              lineHeight="24px"
              color="gray.700"
              fontWeight={400}
              mb="16px"
            >
              {description}
            </Typography>
            <Link href={url}>
              <Button variant="outline" size="sm">
                {BUTTON_TEXT}
              </Button>
            </Link>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
