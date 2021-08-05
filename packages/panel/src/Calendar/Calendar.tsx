import 'tui-calendar/dist/tui-calendar.css';

import React, { useEffect, useRef, useState } from 'react';
import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule } from 'tui-calendar';

import { Box } from '@coderscamp/ui/components/Box';
import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

import { calendars } from './calendars';
import { events } from './events';

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

export const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarInst = useRef(null);

  useEffect(() => {
    calendarInst.current = calendarInst.current?.getInstance();
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

    calendarInst.current[action]();
  };

  return (
    <Box width="100vw" justifyContent="center" alignItems="center">
      <Flex alignItems="center" justifyContent="center" height="70px">
        <Button color="brand" variant="ghost" onClick={() => handleCalendarNavigationClick('prev')}>
          Poprzedni
        </Button>
        <Button variant="ghost" onClick={() => handleCalendarNavigationClick('today')} margin="0px 20px">
          Dzisiaj
        </Button>
        <Button color="brand" variant="ghost" onClick={() => handleCalendarNavigationClick('next')}>
          Następny
        </Button>
        <Typography as="h1" fontSize="16px" fontWeight="bold" marginLeft="20px">
          {months[currentMonth]} {currentYear}
        </Typography>
      </Flex>
      <TUICalendar
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
