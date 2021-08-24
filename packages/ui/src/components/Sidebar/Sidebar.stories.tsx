import React from 'react';
import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import { Sidebar, SidebarProps } from './Sidebar';

const meta: Meta = {
  title: 'Components / Sidebar',
  component: Sidebar,
  decorators: [StoryRouter()],
};

export default meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  width: '256px',
};
