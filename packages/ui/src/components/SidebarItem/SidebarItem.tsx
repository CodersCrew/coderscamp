import React, { ReactElement, ReactText } from 'react';
import { NavLink } from 'react-router-dom';

import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Link } from '../Link';
import { HStack } from '../Stack';
import { Typography } from '../Typography';

export interface SidebarItemProps {
  children: ReactText | ReactText[];
  path: string;
  count?: number;
  icon?: ReactElement;
  iconSelected?: ReactElement;
  disabled?: boolean;
}

export const SidebarItem = ({ children, path, count, icon, iconSelected, disabled }: SidebarItemProps) => {
  return (
    <Flex
      w="100%"
      h="40px"
      borderRadius="6px"
      disabled={disabled}
      _disabled={{ pointerEvents: 'none', opacity: '0.6' }}
      role="group"
    >
      <Link
        as={NavLink}
        to={path}
        w="100%"
        h="100%"
        borderRadius="6px"
        _focus={{ boxShadow: 'none' }}
        _hover={{ textDecor: 'none', bg: 'gray.50' }}
        _activeLink={{ bg: 'gray.100' }}
      >
        <HStack h="100%" pr="12px" justify="space-between">
          <HStack spacing="0">
            {icon && (
              <IconButton
                icon={icon}
                size="md"
                variant="link"
                aria-label=""
                textColor="gray.400"
                _focus={{ boxShadow: 'none' }}
                _groupHover={{ color: 'gray.500' }}
              />
            )}
            <Typography
              size="sm"
              weight="medium"
              color="gray.600"
              pl={icon ? '4px' : '12px'}
              _groupHover={{ color: 'gray.900' }}
              _groupActive={{ color: 'gray.900' }}
              _groupDisabled={{ color: 'gray.600' }}
            >
              {children}
            </Typography>
          </HStack>
          {count && (
            <Badge
              textColor="gray.600"
              _groupHover={{ bg: 'gray.200' }}
              _groupActive={{ bg: '#FFF', textColor: 'gray.900' }}
            >
              {count}
            </Badge>
          )}
        </HStack>
      </Link>
    </Flex>
  );
};
