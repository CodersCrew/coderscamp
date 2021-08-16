import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import { OutlinedCalendarIcon, OutlinedDashboardIcon, OutlinedRocketIcon } from '../../icons';
import { HStack } from '../Stack';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

const icons = {
  Dashboard: <OutlinedDashboardIcon />,
  Rocket: <OutlinedRocketIcon />,
  Calendar: <OutlinedCalendarIcon />,
  None: undefined,
};

const meta: Meta = {
  title: 'Components / SidebarItem',
  component: SidebarItem,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
      },
    },
  },
  decorators: [StoryRouter()],
};

export default meta;

const Template: Story<SidebarItemProps> = (args) => <SidebarItem {...args} />;

export const Playground = Template.bind({});

// Change args before PR
Playground.args = {
  children: 'Dashbord',
  count: 5,
  path: '/',
};

export const Other = () => (
  <VStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem path="">Dashboard</SidebarItem>
      <SidebarItem path="">Active</SidebarItem>
      <SidebarItem path="" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem icon={<OutlinedDashboardIcon />} path="">
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} path="">
        Active
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} path="" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem count={1} path="">
        Dashboard
      </SidebarItem>
      <SidebarItem count={2} path="">
        Active
      </SidebarItem>
      <SidebarItem count={3} path="" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="">
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="">
        Active
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="" disabled>
        Disabled
      </SidebarItem>
    </HStack>
  </VStack>
);
