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

type EventTarget = {
  target: HTMLButtonElement;
};

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
  const calendarInst = useRef(null);

  useEffect(() => {
    calendarInst.current = calendarInst?.current?.getInstance();
  }, []);

  // eslint-disable-next-line consistent-return
  const handleMonthChange = (action: string) => {
    switch (action) {
      case 'next':
        if (currentMonth === 11) {
          return setCurrentMonth(0);
        }

        setCurrentMonth(currentMonth + 1);
        break;
      case 'prev':
        if (currentMonth === 0) {
          return setCurrentMonth(11);
        }

        setCurrentMonth(currentMonth - 1);
        break;
      case 'today':
      default:
        setCurrentMonth(new Date().getMonth());
        break;
    }
  };

  const handleCalendarNavigationClick = (event: EventTarget) => {
    if (event.target.tagName === 'BUTTON') {
      const { target } = event;
      let action = (target.dataset.action as string) || (target.getAttribute('data-action') as string);
      action = action?.replace('move-', '');

      handleMonthChange(action);

      calendarInst.current[action]();
    }
  };

  return (
    <Box width="100vw" justifyContent="center" alignItems="center">
      <Flex alignItems="center" height="70px" marginLeft="50px">
        <Button
          className="btn btn-default btn-sm move-day"
          data-action="move-prev"
          color="brand"
          variant="ghost"
          onClick={(e) => handleCalendarNavigationClick(e as unknown as EventTarget)}
        >
          Prev
        </Button>
        <Button
          className="btn btn-default btn-sm move-today"
          data-action="move-today"
          variant="ghost"
          onClick={(e) => handleCalendarNavigationClick(e as unknown as EventTarget)}
        >
          Dzisiaj
        </Button>
        <Button
          className="btn btn-default btn-sm move-day"
          data-action="move-next"
          color="brand"
          variant="ghost"
          onClick={(e) => handleCalendarNavigationClick(e as unknown as EventTarget)}
        >
          Next
        </Button>
        <Typography as="h1" fontSize="16px" fontWeight="bold" marginLeft="20px">
          {months[currentMonth]}
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
