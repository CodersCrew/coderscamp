import { DateType } from 'tui-calendar';

export const getDateWithoutHours = (date: DateType) => {
  const dateTime = new Date(date as string);

  return new Intl.DateTimeFormat('pl').format(dateTime);
};

export const getHourWithMinutes = (date: DateType) => {
  const dateTime = new Date(date as string);

  dateTime.setHours(dateTime.getHours() + 1);

  return new Intl.DateTimeFormat('pl', { timeStyle: 'short' }).format(dateTime);
};
