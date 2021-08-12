import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { CourseProgressCard, CourseProgressCardProps } from './CourseProgressCard';

const status = [
  {
    name: 'Materiały',
    value: 50,
    max: 120,
  },
  {
    name: 'Testy',
    value: 2,
    max: 6,
  },
  {
    name: 'Projekty',
    value: 1,
    max: 6,
  },
];

const meta: Meta = {
  title: 'Components / CourseProgressCard',
  component: CourseProgressCard,
  argTypes: {
    stats: {
      options: [
        {
          name: { options: 'Materiały', control: { type: 'string' } },
          value: { options: 50, control: 'number' },
          max: { options: 120, control: 'number' },
        },
        {
          name: { options: 'Testy', control: { type: 'string' } },
          value: { options: 1, control: { type: 'number' } },
          max: { options: 6, control: { type: 'number' } },
        },
        {
          name: { options: 'Projekty', control: { type: 'string' } },
          value: { options: 2, control: { type: 'number' } },
          max: { options: 6, control: { type: 'number' } },
        },
      ],
      control: {
        type: 'array',
      },
    },
  },
};

export default meta;

const Template: Story<CourseProgressCardProps> = (args) => <CourseProgressCard {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  stats: status,
};

export const Status = () => (
  <HStack>
    <CourseProgressCard stats={status} />
  </HStack>
);
