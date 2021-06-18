import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from './Button';

const meta: Meta = {
  title: 'Button',
  component: Button,
};

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Button text',
  variant: 'solid',
  size: 'md',
  isLoading: false,
  color: 'default',
  disabled: false,
};
