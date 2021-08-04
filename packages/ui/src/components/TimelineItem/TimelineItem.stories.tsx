import React from 'react';
import { Box } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { TimelineItem, TimelineItemProps } from './TimelineItem';

const meta: Meta = {
  title: 'Components / TimelineItem',
  component: TimelineItem,
};

export default meta;

const Template: Story<TimelineItemProps> = (args) => (
  <Box bg="white" p="40px">
    <TimelineItem {...args} width="400px" height="292px" mb="10px" />
  </Box>
);

export const Playground = Template.bind({});

Playground.args = {
  step: 0,
  date: '24.10-11.11.2021',
  information: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. ipsum, dolor sit amet consectetur adipisicing elit
  Et hic temporibus id sit amet consectetur adipisicing elit.`,
};
