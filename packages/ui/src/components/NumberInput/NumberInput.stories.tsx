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
    <NumberInput size="sm" inputMode="decimal" disabled={false} />
    <NumberInput size="md" inputMode="decimal" disabled={false} />
    <NumberInput size="lg" inputMode="decimal" disabled={false} />
  </HStack>
);

export const InputModes = () => (
  <HStack>
    <NumberInput size="md" inputMode="decimal" disabled={false} />
    <NumberInput size="md" inputMode="numeric" disabled={false} />
  </HStack>
);

export const Disabled = () => (
  <HStack>
    <NumberInput size="md" inputMode="decimal" disabled />
    <NumberInput size="md" inputMode="numeric" disabled={false} />
  </HStack>
);

export const Pseudoclasses = () => (
  <HStack>
    <NumberInput size="md" inputMode="decimal" disabled={false} />
    <NumberInput size="md" inputMode="numeric" disabled={false} value={1} max={0} />
    <NumberInput size="md" inputMode="numeric" disabled={false} isFocus />
  </HStack>
);
