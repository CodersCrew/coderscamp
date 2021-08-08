import moment from 'moment';
import { DateType } from 'tui-calendar';

export const getFormattedDate = (date: DateType) => {
  const dateTime = new Date(date as string);

  dateTime.setHours(dateTime.getHours() + 1);

  return moment(dateTime).format('HH:mm');
};

export const getDateWithoutHours = (date: DateType) => {
  const dateTime = new Date(date as string);

  return moment(dateTime).format('DD.MM.YYYY');
};

export const getHourWithMinutes = (date: DateType) => {
  const dateTime = new Date(date as string);

  dateTime.setHours(dateTime.getHours() + 1);

  return moment(dateTime).format('HH:mm');
};
