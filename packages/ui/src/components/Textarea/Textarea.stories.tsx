import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { Textarea, TextareaProps } from './index';

const meta: Meta = {
  title: 'Components / Textarea',
  component: Textarea,
};

export default meta;

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  placeholder: 'Default textarea',
};

export const Sizes = () => (
  <HStack>
    <Textarea size="sm" placeholder="Small (sm)" />
    <Textarea size="md" placeholder="Medium (md)" />
    <Textarea size="lg" placeholder="Large (lg)" />
  </HStack>
);

export const States = () => (
  <HStack>
    <Textarea placeholder="Disabled" disabled />
    <Textarea placeholder="Danger" invalid value="Invalid" />
    <Textarea placeholder="Filled" value="Filled" />
  </HStack>
);
