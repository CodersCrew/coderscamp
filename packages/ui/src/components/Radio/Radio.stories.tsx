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
  checked: false,
};

export const Sizes = () => (
  <HStack>
    <Radio size="md" value="">
      Medium (md)
    </Radio>
    <Radio size="lg" value="">
      Large (lg)
    </Radio>
  </HStack>
);

export const Checked = () => (
  <HStack>
    <Radio checked value="">
      Checked
    </Radio>
    <Radio value="">Not checked</Radio>
  </HStack>
);

export const Disabled = () => (
  <HStack>
    <Radio disabled value="">
      Disabled
    </Radio>
    <Radio value="">Not disabled</Radio>
  </HStack>
);
