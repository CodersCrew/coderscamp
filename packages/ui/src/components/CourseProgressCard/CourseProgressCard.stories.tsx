import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Box } from '../Box';
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
      status: { type: 'array' },
    },
  },
};

export default meta;

const Template: Story<CourseProgressCardProps> = (args) => {
  return (
    <Box w="376px" h="256px">
      <CourseProgressCard {...args} />
    </Box>
  );
};

export const Playground = Template.bind({});

Playground.args = {
  stats: status,
};
