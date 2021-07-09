import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Label, LabelProps } from './Label';

const sizes = { sm: 'sm', md: 'md', lg: 'lg' };

const meta: Meta = {
  title: 'Components / Label',
  component: Label,
  argTypes: {
    size: {
      options: Object.keys(sizes),
      mapping: sizes,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Label',
  size: 'md',
};

export const Sizes = () => (
  <>
    <Label size="sm">Small (ms)</Label>
    <Label size="md">Medium(md)</Label>
    <Label size="lg">Large (lg)</Label>
  </>
);

export const Variants = () => (
  <>
    <Label size="lg">No required</Label>
    <Label size="lg" required>
      Required
    </Label>
  </>
);
