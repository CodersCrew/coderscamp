import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack, VStack } from '../Stack';
import { Checkbox, CheckboxProps } from './Checkbox';

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
  disabled: false,
  checked: false,
  name: 'terms',
  value: 'agree',
};

export const Sizes = () => (
  <HStack>
    <Checkbox>Medium (md)</Checkbox>
    <Checkbox size="lg"> Large (lg)</Checkbox>
  </HStack>
);

export const Checked = () => (
  <HStack>
    <Checkbox checked>Checked</Checkbox>
    <Checkbox> Unchecked</Checkbox>
  </HStack>
);

export const Disabled = () => (
  <HStack>
    <VStack>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox checked disabled>
        Disabled
      </Checkbox>
    </VStack>
    <VStack>
      <Checkbox>Not disabled</Checkbox>
      <Checkbox checked>Not disabled</Checkbox>
    </VStack>
  </HStack>
);
