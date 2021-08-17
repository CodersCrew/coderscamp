import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Box } from '../Box';
import { CourseProgressCard, CourseProgressCardProps } from './CourseProgressCard';
import { statsData } from './CourseProgressCard.mock';

const meta: Meta = {
  title: 'Components / CourseProgressCard',
  component: CourseProgressCard,
  argTypes: {
    stats: {
      statsData: { type: 'array' },
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
  stats: statsData,
};
