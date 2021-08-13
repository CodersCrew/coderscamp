import React from 'react';
import { Meta, Story } from '@storybook/react';

import { EventCardProps, EventsCard } from './EventsCard';
import { EVENTS as events } from './EventsCard.mocks';

const meta: Meta = {
  title: 'Components/EventsCard',
  component: EventsCard,
};
export default meta;

const Template: Story<EventCardProps> = (args) => <EventsCard {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  events,
  width: '784px',
};
