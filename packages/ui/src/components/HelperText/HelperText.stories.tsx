import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HelperText, HelperTextProps } from './HelperText';

const meta: Meta = {
  title: 'Components / HelperText',
  component: HelperText,
};

export default meta;

const Template: Story<HelperTextProps> = (args) => <HelperText {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Helper text content',
  size: 'md',
  variant: 'default',
};

export const Sizes = () => (
  <>
    <HelperText size="sm">Small (ms)</HelperText>
    <HelperText size="md">Medium(md)</HelperText>
    <HelperText size="lg">Large (lg)</HelperText>
  </>
);

export const Variants = () => (
  <>
    <HelperText variant="default">Default</HelperText>
    <HelperText variant="warning">Warning</HelperText>
    <HelperText variant="error">Error</HelperText>
  </>
);
