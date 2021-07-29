import moment from 'moment';

import { DoneProps, NotDoneProps } from './projectCardTypes';

moment.locale('pl');

export const statusValueCheck = (statusValue: DoneProps | NotDoneProps) => {
  if (statusValue.status === 'done') {
    return {
      statusText: 'Zakończony',
      timeStatus: 'Punkty',
      dateOrPoints: `${statusValue.points}/${statusValue.pointsMax}`,
    };
  }

  if (statusValue.status === 'doing') {
    return {
      statusText: 'W trakcie',
      timeStatus: 'Deadline',
      dateOrPoints: moment(statusValue.date).format('L'),
    };
  }

  if (statusValue.status === 'review') {
    return {
      statusText: 'W ocenie',
      timeStatus: 'Demo',
      dateOrPoints: moment(statusValue.date).format('L'),
    };
  }
  return {
    statusText: 'Nie rozpoczęty',
    timeStatus: 'Rozpoczęcie',
    dateOrPoints: moment(statusValue.date).format('L'),
  };
};
