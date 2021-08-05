import 'tui-calendar/dist/tui-calendar.css';

import React, { useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import { ISchedule } from 'tui-calendar';

import { Box } from '@coderscamp/ui/components/Box';
import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Typography } from '@coderscamp/ui/components/Typography';
import { OutlinedArrowLeftIcon, OutlinedArrowRightIcon } from '@coderscamp/ui/icons';

import { calendars } from './calendars';
import { events } from './events';

type Action = 'prev' | 'today' | 'next';

type CalendarRef = {
  next: () => void;
  prev: () => void;
  today: () => void;
} & Calendar;

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

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarInst = useRef<CalendarRef | null>(null);

  useEffect(() => {
    if (calendarInst.current) {
      calendarInst.current = calendarInst.current.getInstance();
    }
  }, []);

  const handleMonthChange = (action: Action) => {
    switch (action) {
      case 'next':
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
          return;
        }

        setCurrentMonth(currentMonth + 1);
        break;
      case 'prev':
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
          return;
        }

        setCurrentMonth(currentMonth - 1);
        break;
      case 'today':
      default:
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
        break;
    }
  };

  const handleCalendarNavigationClick = (action: Action) => {
    handleMonthChange(action);

    if (calendarInst.current) {
      calendarInst.current[action]();
    }
  };

  return (
    <Box width="100vw" justifyContent="center" alignItems="center">
      <Flex alignItems="center" justifyContent="center" height="70px">
        <IconButton
          icon={<OutlinedArrowLeftIcon />}
          variant="ghost"
          aria-label="Poprzedni miesiąc"
          onClick={() => handleCalendarNavigationClick('prev')}
        />

        <Button variant="ghost" onClick={() => handleCalendarNavigationClick('today')} margin="0px 20px">
          Dzisiaj
        </Button>
        <IconButton
          icon={<OutlinedArrowRightIcon />}
          variant="ghost"
          aria-label="Następny miesiąc"
          onClick={() => handleCalendarNavigationClick('next')}
        />
        <Box width="200px">
          <Typography as="h1" fontSize="16px" fontWeight="bold" marginLeft="20px">
            {months[currentMonth]} {currentYear}
          </Typography>
        </Box>
      </Flex>
      <Calendar
        ref={calendarInst}
        month={{
          startDayOfWeek: 1,
        }}
        usageStatistics={false}
        defaultView="month"
        height="calc(100vh - 71px)"
        isReadOnly
        calendars={calendars}
        schedules={events}
        scheduleView
        taskView
        useDetailPopup
        view="month"
        template={{
          allday({ title }: ISchedule) {
            return `<h1 style="text-align:center;">${title}</h1>`;
          },
        }}
      />
    </Box>
  );
};
