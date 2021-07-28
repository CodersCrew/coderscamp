import moment from 'moment';

moment.locale('pl');
type StatusProps = 'idle' | 'doing' | 'review' | 'done';
type StatusCase = {
  statusText: string;
  timeStatus: string;
  dateOrPoints: string;
  isDoing: boolean;
};

export const statusValueCheck = (status: StatusProps, points: number, pointsMax: number, dateProps: Date) => {
  let statusCase: StatusCase;

  switch (status) {
    case 'doing':
      statusCase = {
        statusText: 'W trakcie',
        timeStatus: 'Deadline',
        dateOrPoints: moment(dateProps).format('L'),
        isDoing: true,
      };
      return statusCase;
    case 'review':
      statusCase = {
        statusText: 'W ocenie',
        timeStatus: 'Demo',
        dateOrPoints: moment(dateProps).format('L'),
        isDoing: true,
      };
      return statusCase;
    case 'done': {
      statusCase = {
        statusText: 'Zakończony',
        timeStatus: 'Punkty',
        dateOrPoints: `${points}/${pointsMax}`,
        isDoing: true,
      };
      return statusCase;
    }
    default:
      statusCase = {
        statusText: 'Nie rozpoczęty',
        timeStatus: 'Rozpoczęcie',
        dateOrPoints: moment(dateProps).format('L'),
        isDoing: false,
      };
      return statusCase;
  }
};
