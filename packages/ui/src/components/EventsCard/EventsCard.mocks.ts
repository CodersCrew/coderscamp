import { EventDateType } from './EventsCard';

const eventDescription =
  'Sed dui elementum, elit est id malesuada leo varius. Arcu tempus, non justo leo egestas.' +
  'A cras fames a ullamcorper. Laoreet ut orci semper massa integer ut consequat aliquam. Commodo enim, sed' +
  'lorem nibh vivamus neque congue...';

export const events = [
  {
    id: 1,
    title: 'Test kwalifikacyjny na CodersCamp',
    date: { from: new Date(2021, 4, 4, 13, 40), to: new Date(2021, 5, 4, 15, 40) },
    description: eventDescription,
    url: '#',
  },
  {
    id: 2,
    title: 'Test z modułu 2',
    date: new Date(2012, 7, 8, 10, 10),
    description: eventDescription,
    url: '#',
  },
  {
    id: 3,
    title: 'Termin oddania projektu z modułu 1',
    date: new Date(2012, 9, 20, 1, 5),
    description: eventDescription,
    url: '#',
  },
];

export const createEventMock = (date: EventDateType) => [
  {
    id: 0,
    title: '',
    date,
    description: '',
    url: '#',
  },
];
