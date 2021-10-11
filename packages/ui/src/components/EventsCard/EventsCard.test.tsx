import React from 'react';
import { render, screen } from '@testing-library/react';

import { BUTTON_TEXT, EventsCard, MAIN_TITLE } from './EventsCard';
import { createEventMock, events as listOfEvents } from './EventsCard.mocks';

describe('EventsCard tests', () => {
  describe('render component tests', () => {
    it('main title should be render', () => {
      render(<EventsCard events={listOfEvents} />);

      const title = screen.getByText(MAIN_TITLE);

      expect(title).toBeInTheDocument();
    });

    describe('render events tests', () => {
      it('should be render 3 events when events arg contain 3 events', () => {
        render(<EventsCard events={listOfEvents} />);

        const allEvents = screen.getAllByTestId('event');

        expect(allEvents.length).toEqual(listOfEvents.length);
      });

      it('buttons should be render with text Przejdź do wydarzenia', () => {
        render(<EventsCard events={listOfEvents} />);

        const allButtons = screen.getAllByRole('button');

        (allButtons || []).map((button) => expect(button).toHaveTextContent(BUTTON_TEXT));
      });
    });
  });

  describe('date tests', () => {
    it('date should be render like 01.11 when date arg is new Date(2012, 10, 1, 10, 10)', () => {
      const events = createEventMock(new Date(2012, 10, 1, 10, 10));

      render(<EventsCard events={events} />);

      const eventDate = screen.getByText('01.11');

      expect(eventDate).toHaveTextContent('01.11');
    });

    it('date should be render like 02.12 when date arg is {from: new Date(2012, 11, 2, 0, 0), to: new Date(2012, 10, 1, 0, 0)}', () => {
      const events = [
        {
          id: 0,
          title: '',
          date: { from: new Date(2012, 11, 2, 0, 0), to: new Date(2012, 10, 1, 0, 0) },
          description: '',
          url: '#',
        },
      ];

      render(<EventsCard events={events} />);

      const eventDate = screen.getByText('02.12');

      expect(eventDate).toHaveTextContent('02.12');
    });
  });

  describe('hours tests', () => {
    it('hours should be render like 00:00 when date arg is new Date(2012, 10, 1, 0, 0)', () => {
      const events = createEventMock(new Date(2012, 10, 1, 0, 0));

      render(<EventsCard events={events} />);

      const eventDate = screen.getByText('00:00');

      expect(eventDate).toHaveTextContent('00:00');
    });

    it('hours should be render like 00:00-00:00 when date arg is {from: new Date(2012, 10, 1, 0, 0), to: new Date(2012, 10, 1, 0, 0)}', () => {
      const events = createEventMock({ from: new Date(2012, 10, 1, 0, 0), to: new Date(2012, 10, 1, 0, 0) });

      render(<EventsCard events={events} />);

      const eventDate = screen.getByText('00:00-00:00');

      expect(eventDate).toHaveTextContent('00:00-00:00');
    });
  });
});
