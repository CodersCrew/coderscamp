import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import {
  OutlinedCalendarIcon,
  OutlinedDashboardIcon,
  OutlinedRocketIcon,
  SolidCalendarIcon,
  SolidDashboardIcon,
  SolidRocketIcon,
} from '../../icons';
import { HStack } from '../Stack';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

const icons = {
  Dashboard: <OutlinedDashboardIcon />,
  Rocket: <OutlinedRocketIcon />,
  Calendar: <OutlinedCalendarIcon />,
  None: undefined,
};

const iconsSelected = {
  Dashboard: <SolidDashboardIcon />,
  Rocket: <SolidRocketIcon />,
  Calendar: <SolidCalendarIcon />,
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
    iconSelected: {
      options: Object.keys(iconsSelected),
      mapping: iconsSelected,
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

Playground.args = {
  children: 'Dashbord',
  count: undefined,
  path: '/panel',
};

export const Other = () => (
  <VStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem path="/k">Dashboard</SidebarItem>
      <SidebarItem path="/">Active</SidebarItem>
      <SidebarItem path="/a" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem icon={<OutlinedDashboardIcon />} iconSelected={<SolidDashboardIcon />} path="/m">
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} iconSelected={<SolidDashboardIcon />} path="/">
        Active
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} iconSelected={<SolidDashboardIcon />} path="/i" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem count={1} path="/l">
        Dashboard
      </SidebarItem>
      <SidebarItem count={2} path="">
        Active
      </SidebarItem>
      <SidebarItem count={3} path="/t" disabled>
        Disabled
      </SidebarItem>
    </HStack>
    <HStack w="788px" spacing="10px">
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="/u">
        Dashboard
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="">
        Active
      </SidebarItem>
      <SidebarItem icon={<OutlinedDashboardIcon />} count={314} path="/byl" disabled>
        Disabled
      </SidebarItem>
    </HStack>
  </VStack>
);
