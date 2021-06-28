import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { Badge, BadgeProps } from './Badge';

const meta: Meta = {
  title: 'Badge',
  component: Badge,
};

export default meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Badge text',
  size: 'large',
  color: 'brand',
};

export const Sizes = () => (
  <HStack>
    <Badge size="small" color="red">
      Small
    </Badge>
    <Badge size="large" color="red">
      Large
    </Badge>
  </HStack>
);

export const Colors = () => (
  <HStack>
    <Badge color="default">Default</Badge>
    <Badge color="brand">Brand</Badge>
    <Badge color="blue">Blue</Badge>
    <Badge color="green">Green</Badge>
    <Badge color="orange">Orange</Badge>
    <Badge color="red">Red</Badge>
  </HStack>
);
