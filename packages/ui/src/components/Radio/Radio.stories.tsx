import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import { Radio, RadioProps } from './Radio';

const meta: Meta = {
  title: 'Components / Radio',
  component: Radio,
};

export default meta;

const Template: Story<RadioProps> = (args: RadioProps) => <Radio {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Radio label',
  size: 'md',
  disabled: false,
  color: 'default',
};

export const Sizes = () => (
  <HStack>
    <Radio size="md">Medium (md)</Radio>
    <Radio size="lg">Large (lg)</Radio>
  </HStack>
);

export const Colors = () => (
  <HStack>
    <Radio checked color="brand">
      Brand
    </Radio>
    <Radio checked>Default</Radio>
  </HStack>
);

// Uses different color than default because grey is not visible
export const Checked = () => (
  <HStack>
    <Radio checked color="brand">
      Checked
    </Radio>
    <Radio color="brand">Not checked</Radio>
  </HStack>
);

export const Disabled = () => (
  <HStack>
    <Radio disabled>Disabled</Radio>
    <Radio>Not disabled</Radio>
  </HStack>
);
