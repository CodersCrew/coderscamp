import { useAsync } from 'react-use';
import { ISchedule } from 'tui-calendar';

import { useTheme } from '@coderscamp/ui/hooks/useTheme';

const { VITE_GOOGLE_API_KEY } = import.meta.env;
const CALENDAR_ID = 'c_pormamd238tbnleq3adm7q33fc@group.calendar.google.com';

const GOOGLE_CALENDAR_API_URL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${VITE_GOOGLE_API_KEY}`;

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

const getEventColor = (summary: string, defaultEventColor: string) => {
  if (summary.includes('Dział 1')) {
    return '#f0db4f';
  }

  if (summary.includes('Dział 2')) {
    return '#007acc';
  }

  if (summary.includes('Dział 3')) {
    return '#68a063';
  }

  if (summary.includes('Dział 4')) {
    return '#61dbfb';
  }

  if (summary.includes('Dział 5')) {
    return '#764abc';
  }

  return defaultEventColor;
};

const restructureCalendarEvents = ({ items }: GoogleCalendarResponse, defaultEventColor: string): ISchedule[] => {
  return items.map(({ id, summary, start, end }) => {
    const color = getEventColor(summary, defaultEventColor);

    return {
      id,
      title: summary,
      start: new Date(start.date || start.dateTime),
      end: new Date(end.date || end.dateTime),
      category: 'time',
      // Google Calendar API returns start.date only if event is all day long, otherwise it returns end.dateTime
      isAllDay: !!start.date,
      bgColor: color,
      borderColor: color,
    };
  });
};

export const useCalendar = () => {
  const theme = useTheme();
  const defaultEventColor = theme.colors.brand[600];

  const events = useAsync(async () => {
    const response = await fetch(GOOGLE_CALENDAR_API_URL);
    const result: GoogleCalendarResponse = await response.json();

    const calendarEvents = restructureCalendarEvents(result, defaultEventColor);

    return calendarEvents;
  }, []);

  return events;
};
