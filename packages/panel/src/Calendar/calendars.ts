import { ICalendarInfo } from 'tui-calendar';

import { colors } from '@coderscamp/ui/theme/overwrites/foundations/colors';

export const calendars: ICalendarInfo[] = [
  {
    id: '0',
    name: 'JavaScript',
    bgColor: colors.brand[300],
    borderColor: colors.brand[300],
  },
  {
    id: '1',
    name: 'TypeScript',
    bgColor: colors.blue[500],
    borderColor: colors.blue[500],
  },
  {
    id: '2',
    name: 'Node',
    bgColor: colors.green[500],
    borderColor: colors.green[500],
  },
  {
    id: '3',
    name: 'React',
    bgColor: colors.blue[300],
    borderColor: colors.blue[300],
  },
  {
    id: '4',
    name: 'Spotkania Organizacyjne',
    bgColor: colors.brand[500],
    borderColor: colors.brand[500],
  },
];
