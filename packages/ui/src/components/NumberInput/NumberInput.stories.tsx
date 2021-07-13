import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { NumberInput, NumberInputProps } from './NumberInput';

const meta: Meta = {
  title: 'Components / NumberInput',
  component: NumberInput,
};

export default meta;

const Template: Story<NumberInputProps> = (args) => <NumberInput {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  size: 'sm',
  inputMode: 'decimal',
  disabled: false,
};

export const Sizes = () => (
  <HStack>
    <NumberInput size="sm" />
    <NumberInput size="md" />
    <NumberInput size="lg" />
  </HStack>
);

export const InputModes = () => (
  <HStack>
    <NumberInput size="md" />
    <NumberInput size="md" inputMode="numeric" />
  </HStack>
);

export const Disabled = () => (
  <HStack>
    <NumberInput size="md" disabled />
    <NumberInput size="md" />
  </HStack>
);

export const Pseudoclasses = () => (
  <HStack>
    <NumberInput size="md" />
    <NumberInput size="md" value={1} max={0} />
    <NumberInput size="md" isFocus />
  </HStack>
);
