import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { Input, InputProps } from './Input';

const meta: Meta = {
  title: 'Components / Input',
  component: Input,
};

export default meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  size: 'md',
  disabled: false,
  placeholder: 'Placeholder',
};

export const Sizes = () => (
  <HStack>
    <Input placeholder="Small (sm)" size="sm" />
    <Input placeholder="Medium (md)" />
    <Input placeholder="Large (lg)" size="lg" />
  </HStack>
);

export const OtherStates = () => (
  <HStack>
    <Input isInvalid="true" placeholder="Invalid!" />
    <Input disabled placeholder="Disabled" />
  </HStack>
);
