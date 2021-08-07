import { useAsync } from 'react-use';
import { ISchedule } from 'tui-calendar';

import { colors } from '@coderscamp/ui/theme/overwrites/foundations/colors';

const { VITE_CALENDAR_ID, VITE_GOOGLE_API_KEY } = import.meta.env;

const GOOGLE_CALENDAR_API_URL = `https://www.googleapis.com/calendar/v3/calendars/${VITE_CALENDAR_ID}/events?key=${VITE_GOOGLE_API_KEY}`;

type GoogleCalendarEvent = {
  id: string;
  summary: string;
  start: {
    date?: string;
    dateTime: string;
  };
  end: {
    date?: string;
    dateTime: string;
  };
};

type GoogleCalendarResponse = {
  description: string;
  items: GoogleCalendarEvent[];
};

const getEventColor = (summary: string) => {
  if (summary.includes('Dział 1')) {
    return colors.brand[300];
  }

  if (summary.includes('Dział 2')) {
    return colors.blue[400];
  }

  if (summary.includes('Dział 3')) {
    return colors.green[400];
  }

  if (summary.includes('Dział 4')) {
    return colors.blue[300];
  }

  if (summary.includes('Dział 5')) {
    return colors.blue[500];
  }

  return colors.brand[600];
};

export const useCalendar = () => {
  const restructureCalendarEvents = ({ items }: GoogleCalendarResponse): ISchedule[] => {
    return items.map(({ id, summary, start, end }) => {
      const color = getEventColor(summary);

      return {
        id,
        title: summary,
        start: new Date(start.date || start.dateTime),
        end: new Date(end.date || end.dateTime),
        category: 'time',
        // google returns start.date only if event is all day long, otherwise it returns end.dateTime
        isAllDay: !!start.date,
        bgColor: color,
        borderColor: color,
      };
    });
  };

  const events = useAsync(async () => {
    const response = await fetch(GOOGLE_CALENDAR_API_URL);
    const result: GoogleCalendarResponse = await response.json();

    const calendarEvents = restructureCalendarEvents(result);

    return calendarEvents;
  }, []);

  return events;
};
