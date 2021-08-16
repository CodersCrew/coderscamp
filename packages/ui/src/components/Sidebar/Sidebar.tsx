import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  OutlinedCalendarIcon,
  OutlinedChecklistIcon,
  OutlinedDashboardIcon,
  OutlinedRocketIcon,
  OutlinedSelectorIcon,
  SolidCalendarIcon,
  SolidDashboardIcon,
  SolidRocketIcon,
} from '../../icons';
import { Avatar } from '../Avatar';
import { Center } from '../Center';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Logo } from '../Logo';
import { SidebarItem } from '../SidebarItem';
import { HStack, Stack, VStack } from '../Stack';
import { Typography } from '../Typography';

export interface SidebarProps {
  width: string;
}

const SidebarItems = [
  {
    text: 'Dashboard',
    path: '/panel',
    icon: <OutlinedDashboardIcon />,
    iconSelected: <SolidDashboardIcon />,
    count: 5,
  },
  {
    text: 'Projekty',
    path: '/projekty',
    icon: <OutlinedRocketIcon />,
    iconSelected: <SolidRocketIcon />,
  },
  {
    text: 'Kalendarz',
    path: '/kalendarz',
    icon: <OutlinedCalendarIcon />,
    iconSelected: <SolidCalendarIcon />,
  },
  {
    text: 'TestDisabled',
    path: 'disabled',
    icon: <OutlinedChecklistIcon />,
    disabled: true,
  },
  {
    text: 'TestOneIcon',
    path: 'whatever',
    icon: <OutlinedRocketIcon />,
  },
];

export const Sidebar = ({ width }: SidebarProps) => {
  return (
    <Router>
      <Flex w={width} h="100vh" pos="relative" top="0" left="0" bottom="0" flexDir="column" justify="space-between">
        <VStack h="max" p="20px 0 16px" spacing="20px">
          <Center p="0 12px">
            <Logo color="black" />
          </Center>
          <VStack w="100%" p="0 8px" spacing="4px" flexGrow={1}>
            {SidebarItems.map((item) => (
              <SidebarItem
                key={item.text}
                path={item.path}
                icon={item.icon}
                iconSelected={item.iconSelected}
                disabled={item.disabled}
                count={item.count}
              >
                {item.text}
              </SidebarItem>
            ))}
          </VStack>
        </VStack>
        <VStack w={width} h="73px" spacing="0">
          <Divider bg="gray.200" />
          <Center w="100%" p="16px">
            <HStack w="100%" spacing="0">
              <HStack w="100%" spacing="12px">
                {/* dodaj src do avatara */}
                <Avatar size="sm" />
                <Stack spacing="0">
                  {/* zamien na user.name i user.surname */}
                  <Typography color="gray.700" size="sm" weight="medium">
                    Christiana
                  </Typography>
                  <Typography color="gray.700" size="sm" weight="medium">
                    Michaelson
                  </Typography>
                </Stack>
              </HStack>
              <IconButton icon={<OutlinedSelectorIcon />} variant="ghost" size="md" aria-label="Selector" />
            </HStack>
          </Center>
        </VStack>
      </Flex>
    </Router>
  );
};
