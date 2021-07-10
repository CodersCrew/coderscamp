import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { Logo, LogoProps } from './Logo';

const meta: Meta = {
  title: 'Components / Logo',
  component: Logo,
};

export default meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  layout: 'horizontal',
  color: 'black',
};

export const Layouts = () => (
  <HStack>
    <Logo layout="horizontal" />
    <Logo layout="square" />
  </HStack>
);

export const Colors = () => (
  <HStack>
    <Logo color="white" />
    <Logo color="black" />
  </HStack>
);
