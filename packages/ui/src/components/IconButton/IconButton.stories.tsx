import React from 'react';
import { AddIcon, ChatIcon, LockIcon } from '@chakra-ui/icons';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { IconButton, IconButtonProps } from './IconButton';

const icons = { Chat: <ChatIcon />, Lock: <LockIcon />, Add: <AddIcon /> };

const meta: Meta = {
  title: 'IconButton',
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
  icon: <ChatIcon />,
  'aria-label': 'Icon Button',
};

export const Sizes = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} size="xs" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} size="sm" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} size="md" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} size="lg" aria-label="Chat Icon Button" />
  </HStack>
);

export const Variants = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} variant="solid" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} variant="outline" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} variant="ghost" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} variant="link" aria-label="Chat Icon Button" />
  </HStack>
);

export const Colors = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} color="default" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} color="brand" aria-label="Chat Icon Button" />
    <IconButton icon={<ChatIcon />} color="danger" aria-label="Chat Icon Button" />
  </HStack>
);
