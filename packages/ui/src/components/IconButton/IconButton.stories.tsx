import React from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { Meta, Story } from '@storybook/react';

import { HStack } from '../Stack';
import { IconButton, IconButtonProps } from './IconButton';

const meta: Meta = {
  title: 'IconButton',
  component: IconButton,
};

export default meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  variant: 'solid',
  size: 'md',
  color: 'default',
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
