import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack, VStack } from '../Stack';
import { Checkbox, CheckboxProps } from '.';

const UnCheckedCb = (props: Omit<CheckboxProps, 'onChange' | 'checked'>) => (
  <Checkbox {...props} onChange={() => {}} checked={false} />
);
const CheckedCb = (props: Omit<CheckboxProps, 'onChange' | 'checked'>) => (
  <Checkbox {...props} onChange={() => {}} checked />
);

const meta: Meta = {
  title: 'Components / Checkbox',
  component: Checkbox,
};

export default meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Checkbox text',
  size: 'md',
  color: 'black',
  disabled: false,
};

export const Checkboxes = () => (
  <VStack align="left">
    <p>Not disabled: </p>
    <HStack>
      <UnCheckedCb />
      <CheckedCb />
    </HStack>
    <p>Disabled: </p>
    <HStack>
      <UnCheckedCb disabled />
      <CheckedCb disabled />
    </HStack>
    <p>With labels: </p>
    <HStack>
      <VStack align="left">
        <UnCheckedCb> unchecked label </UnCheckedCb>
        <UnCheckedCb disabled> unchecked disabled label </UnCheckedCb>
        <UnCheckedCb size="lg"> unchecked LG label </UnCheckedCb>
        <UnCheckedCb size="lg" disabled>
          unchecked disabled LG label
        </UnCheckedCb>
      </VStack>
      <VStack align="left">
        <CheckedCb> checked label </CheckedCb>
        <CheckedCb disabled> checked disabled label </CheckedCb>
        <CheckedCb size="lg"> checked LG label </CheckedCb>
        <CheckedCb size="lg" disabled>
          checked disabled LG label
        </CheckedCb>
      </VStack>
    </HStack>
  </VStack>
);
