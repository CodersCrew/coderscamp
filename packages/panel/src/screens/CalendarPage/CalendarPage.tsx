import 'tui-calendar/dist/tui-calendar.css';

import React, { useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import { DateType, ISchedule } from 'tui-calendar';

import { Box } from '@coderscamp/ui/components/Box';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Spinner } from '@coderscamp/ui/components/Spinner';
import { Typography } from '@coderscamp/ui/components/Typography';
import { OutlinedArrowLeftIcon, OutlinedArrowRightIcon } from '@coderscamp/ui/icons';

import { useCalendar } from './useCalendar';

// Related issue: https://github.com/vitejs/vite/issues/2139#issuecomment-802981228
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CalendarComponent = Calendar?.default ?? Calendar;

type Action = 'prev' | 'today' | 'next';

const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const getDateWithoutHours = (date: DateType) => {
  const dateTime = new Date(date as string);

  return new Intl.DateTimeFormat('pl').format(dateTime);
};

const getHourWithMinutes = (date: DateType) => {
  const dateTime = new Date(date as string);

  dateTime.setHours(dateTime.getHours() + 1);

  return new Intl.DateTimeFormat('pl', { timeStyle: 'short' }).format(dateTime);
};

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const calendarRef = useRef<Calendar>(null);
  const { value: events, loading } = useCalendar();

  const calendarInstance = calendarRef.current?.getInstance();

  const changeToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);

      return;
    }

    setCurrentMonth(currentMonth + 1);
  };

  const changeToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);

      return;
    }

    setCurrentMonth(currentMonth - 1);
  };

  const changeToToday = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  const handleMonthChange = (action: Action) => {
    switch (action) {
      case 'next':
        changeToNextMonth();
        break;
      case 'prev':
        changeToPrevMonth();
        break;
      default:
        changeToToday();
        break;
    }
  };

  const handleCalendarNavigationClick = (action: Action) => {
    handleMonthChange(action);

    if (calendarInstance) {
      calendarInstance[action]();
    }
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box justifyContent="center" alignItems="center">
      <Center height="70px">
        <IconButton
          icon={<OutlinedArrowLeftIcon />}
          variant="ghost"
          aria-label="Poprzedni miesiąc"
          size="md"
          onClick={() => handleCalendarNavigationClick('prev')}
        />
        <Button variant="ghost" onClick={() => handleCalendarNavigationClick('today')} margin="0px 10px">
          Dzisiaj
        </Button>
        <IconButton
          icon={<OutlinedArrowRightIcon />}
          variant="ghost"
          aria-label="Następny miesiąc"
          size="md"
          onClick={() => handleCalendarNavigationClick('next')}
        />
        <Box width="160px">
          <Typography as="h1" marginLeft="20px">
            {months[currentMonth]} {currentYear}
          </Typography>
        </Box>
      </Center>
      <CalendarComponent
        ref={calendarRef}
        month={{
          startDayOfWeek: 1,
        }}
        usageStatistics={false}
        defaultView="month"
        height="calc(100vh - 71px)"
        isReadOnly
        schedules={events}
        scheduleView
        taskView
        useDetailPopup
        view="month"
        template={{
          time({ start, title }: ISchedule) {
            return `<strong>${getHourWithMinutes(start as DateType)} ${title}</strong>`;
          },
          popupDetailDate(isAllDay: boolean, start: DateType, end: DateType) {
            if (!isAllDay) {
              return `<h2 style="font-weight: 400;">${getHourWithMinutes(start)} - ${getHourWithMinutes(end)}</h2>`;
            }

            return `<h2 style="font-weight: 400;">${getDateWithoutHours(start)} - ${getDateWithoutHours(end)}</h2>`;
          },
          allday({ title }: ISchedule) {
            const isTitleWhite = title?.includes('Dział 2') || title?.includes('Dział 3') || title?.includes('Dział 5');

            return `<h1 style="padding-left: 10px; ${isTitleWhite && 'color: #ffff;'}">${title}</h1>`;
          },
        }}
      />
    </Box>
  );
};
