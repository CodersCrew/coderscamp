import React from 'react';
import { Meta, Story } from '@storybook/react';

import { OutlinedCalendarIcon, SolidChecklistIcon, SolidGitHubIcon } from '../../icons';
import { HStack } from '../Stack';
import { IconButton, IconButtonProps } from './IconButton';

const icons = { Calendar: <OutlinedCalendarIcon />, GitHub: <SolidGitHubIcon />, Checklist: <SolidChecklistIcon /> };

const meta: Meta = {
  title: 'Components / IconButton',
  component: IconButton,
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

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  icon: <SolidGitHubIcon />,
  'aria-label': 'Icon Button',
};

export const Sizes = () => (
  <HStack>
    <IconButton icon={<SolidGitHubIcon />} size="xs" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} size="sm" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} size="md" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} size="lg" aria-label="Chat Icon Button" />
  </HStack>
);

export const Variants = () => (
  <HStack>
    <IconButton icon={<SolidGitHubIcon />} variant="solid" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} variant="outline" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} variant="ghost" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} variant="link" aria-label="Chat Icon Button" />
  </HStack>
);

export const Colors = () => (
  <HStack>
    <IconButton icon={<SolidGitHubIcon />} color="default" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} color="brand" aria-label="Chat Icon Button" />
    <IconButton icon={<SolidGitHubIcon />} color="danger" aria-label="Chat Icon Button" />
  </HStack>
);
