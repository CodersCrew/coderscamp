import React from 'react';
import { Meta, Story } from '@storybook/react';

import { OutlinedCalendarIcon, SolidChecklistIcon, SolidGitHubIcon } from '../../icons';
import { HStack } from '../Stack';
import { Button, ButtonProps } from './Button';

const icons = {
  Calendar: <OutlinedCalendarIcon />,
  GitHub: <SolidGitHubIcon />,
  Checklist: <SolidChecklistIcon />,
  None: undefined,
};

const meta: Meta = {
  title: 'Components / Button',
  component: Button,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Button text',
  variant: 'solid',
  size: 'md',
  isLoading: false,
  color: 'default',
  disabled: false,
};

export const Sizes = () => (
  <HStack>
    <Button size="xs">Extra small (xs)</Button>
    <Button size="sm">Small (sm)</Button>
    <Button size="md">Medium (md)</Button>
    <Button size="lg">Large (lg)</Button>
  </HStack>
);

export const Variants = () => (
  <HStack>
    <Button variant="solid">Solid</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </HStack>
);

export const Colors = () => (
  <HStack>
    <Button color="default">Default</Button>
    <Button color="brand">Brand</Button>
    <Button color="danger">Danger</Button>
  </HStack>
);

export const OtherStates = () => (
  <HStack>
    <Button isLoading>Loading</Button>
    <Button disabled>Disabled</Button>
    <Button icon={<SolidGitHubIcon />}>With Icon</Button>
  </HStack>
);
