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
};

export const Sizes = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} size="xs" />
    <IconButton icon={<ChatIcon />} size="sm" />
    <IconButton icon={<ChatIcon />} size="md" />
    <IconButton icon={<ChatIcon />} size="lg" />
  </HStack>
);

export const Variants = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} variant="solid" />
    <IconButton icon={<ChatIcon />} variant="outline" />
    <IconButton icon={<ChatIcon />} variant="ghost" />
    <IconButton icon={<ChatIcon />} variant="link" />
  </HStack>
);

export const Colors = () => (
  <HStack>
    <IconButton icon={<ChatIcon />} color="default" />
    <IconButton icon={<ChatIcon />} color="brand" />
    <IconButton icon={<ChatIcon />} color="danger" />
  </HStack>
);
