import React from 'react';
import { Meta, Story } from '@storybook/react';

import { TimelineItem, TimelineItemProps } from './TimelineItem';

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'p', 'div'];
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];

const meta: Meta = {
  title: 'Components / TimelineItem',
  component: TimelineItem,
  argTypes: {
    as: {
      control: { type: 'select' },
      options: tags,
    },
    size: {
      control: { type: 'select' },
      options: sizes,
    },
  },
};

export default meta;

const Template: Story<TimelineItemProps> = (args) => <TimelineItem {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  step: 0,
  date: '24.10-11.11.2021',
  information: 'lorem ipsum ',
};
