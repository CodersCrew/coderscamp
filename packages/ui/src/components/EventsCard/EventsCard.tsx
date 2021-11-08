import React from 'react';
import { Flex, Stack } from '@chakra-ui/react';

import { Box, BoxProps } from '../Box';
import { Button } from '../Button';
import { Link } from '../Link';
import { Typography } from '../Typography';

export const MAIN_TITLE = 'Najbliższe terminy';

export const BUTTON_TEXT = 'Przejdź do wydarzenia';

export type EventDateType = Date | { from: Date; to: Date };

export type Event = {
  id: number;
  title: string;
  date: EventDateType;
  description: string;
  url: string;
};

export interface EventCardProps extends BoxProps {
  events: Event[];
}

const getDayAndMonth = (date: Date): string => {
  if (date === undefined) {
    return '';
  }

  const month = date.getMonth() + 1;

  return `${date.getDate().toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}`;
};

const getHourAndMinute = (date: Date): string => {
  if (date === undefined) {
    return '';
  }

  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const EventsCard = ({ events = [], ...props }: EventCardProps) => {
  return (
    <Box width="100%" borderRadius={8} padding="32px" boxShadow="base" backgroundColor="white" {...props}>
      <Typography size="xl" color="gray.900" weight="extrabold" mb="24px">
        {MAIN_TITLE}
      </Typography>
      <Stack spacing="32px">
        {events.map(({ id, title, date, description, url }: Event) => (
          <Flex key={id} wrap="wrap" data-testid="event" overflow="auto">
            <Typography size="5xl" color="gray.900" mr="20px" check="10">
              {'from' in date ? getDayAndMonth(date.from) : getDayAndMonth(date)}
            </Typography>
            <Box maxW="570px">
              <Typography size="lg" color="gray.900" weight="bold">
                {title}
              </Typography>
              <Typography size="sm" color="gray.500" weight="medium" mb="8px">
                {'from' in date && 'to' in date
                  ? `${getHourAndMinute(date.from)}-${getHourAndMinute(date.to)}`
                  : getHourAndMinute(date)}
              </Typography>
              <Typography size="md" color="gray.700" mb="16px">
                {description}
              </Typography>
              <Link href={url}>
                <Button variant="outline" size="sm">
                  {BUTTON_TEXT}
                </Button>
              </Link>
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
