import React from 'react';
import { render, screen } from '@testing-library/react';

import { EventsCard } from './EventsCard';
import { BUTTON_TEXT, events as listOfEvents, MAIN_TITLE } from './EventsCard.mocks';

describe('EventsCard tests', () => {
  describe('render component tests', () => {
    it('main title should be render', () => {
      // when
      render(<EventsCard events={listOfEvents} />);

      // then
      const title = screen.getByText(MAIN_TITLE);

      expect(title).toBeInTheDocument();
    });

    describe('render events tests', () => {
      it('should be render 3 events when events arg contain 3 events', () => {
        // when
        render(<EventsCard events={listOfEvents} />);

        // then
        const allEvents = screen.getAllByTestId('event');

        expect(allEvents.length).toEqual(listOfEvents.length);
      });

      it('buttons should be render with text Przejdź do wydarzenia', () => {
        // when
        render(<EventsCard events={listOfEvents} />);

        // then
        const allButtons = screen.getAllByRole('button');

        (allButtons || []).map((button) => expect(button).toHaveTextContent(BUTTON_TEXT));
      });
    });
  });

  describe('date tests', () => {
    it('date should be render like 01.11 when date arg is new Date(2012, 10, 1, 10, 10)', () => {
      // given
      const events = [
        {
          id: 0,
          title: '',
          date: new Date(2012, 10, 1, 10, 10),
          description: '',
          url: '#',
        },
      ];

      // when
      render(<EventsCard events={events} />);

      // then
      const eventDate = screen.getByTestId('eventDate');

      expect(eventDate).toHaveTextContent('01.11');
    });

    it('date should be render like 02.12 when date arg is {from: new Date(2012, 11, 2, 0, 0), to: new Date(2012, 10, 1, 0, 0)}', () => {
      // given
      const events = [
        {
          id: 0,
          title: '',
          date: { from: new Date(2012, 11, 2, 0, 0), to: new Date(2012, 10, 1, 0, 0) },
          description: '',
          url: '#',
        },
      ];

      // when
      render(<EventsCard events={events} />);

      // then
      const eventDate = screen.getByTestId('eventDate');

      expect(eventDate).toHaveTextContent('02.12');
    });
  });

  describe('hours tests', () => {
    it('hours should be render like 00:00 when date arg is new Date(2012, 10, 1, 0, 0)', () => {
      // given
      const events = [
        {
          id: 0,
          title: '',
          date: new Date(2012, 10, 1, 0, 0),
          description: '',
          url: '#',
        },
      ];

      // when
      render(<EventsCard events={events} />);

      // then
      const eventDate = screen.getByTestId('eventHours');

      expect(eventDate).toHaveTextContent('00:00');
    });

    it('hours should be render like 00:00-00:00 when date arg is {from: new Date(2012, 10, 1, 0, 0), to: new Date(2012, 10, 1, 0, 0)}', () => {
      // given
      const events = [
        {
          id: 0,
          title: '',
          date: { from: new Date(2012, 10, 1, 0, 0), to: new Date(2012, 10, 1, 0, 0) },
          description: '',
          url: '#',
        },
      ];

      // when
      render(<EventsCard events={events} />);

      // then
      const eventDate = screen.getByTestId('eventHours');

      expect(eventDate).toHaveTextContent('00:00-00:00');
    });
  });
});
