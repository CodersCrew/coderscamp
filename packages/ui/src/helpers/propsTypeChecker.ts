type StatusProps = 'idle' | 'doing' | 'review' | 'done';
type StatusCase = {
  statusText: string;
  timeStatus: string;
  dateOrPointsText: string;
  isDoing: boolean;
};

export const propsTypeChecker = (status: StatusProps, dateProps: Date, points: number, pointsMax: number) => {
  let statusCase: StatusCase;
  switch (status) {
    case 'doing':
      statusCase = {
        statusText: 'W trakcie',
        timeStatus: 'Deadline',
        dateOrPointsText: dateProps.toLocaleDateString(),
        isDoing: true,
      };
      return statusCase;
    case 'review':
      statusCase = {
        statusText: 'W ocenie',
        timeStatus: 'Demo',
        dateOrPointsText: dateProps.toLocaleDateString(),
        isDoing: true,
      };
      return statusCase;
    case 'done':
      statusCase = {
        statusText: 'Zakończony',
        timeStatus: 'Punkty',
        dateOrPointsText: `${points}/${pointsMax}`,
        isDoing: true,
      };
      return statusCase;
    default:
      statusCase = {
        statusText: 'Nie rozpoczęty',
        timeStatus: 'Rozpoczęcie',
        dateOrPointsText: dateProps.toLocaleDateString(),
        isDoing: false,
      };
      return statusCase;
  }
};
