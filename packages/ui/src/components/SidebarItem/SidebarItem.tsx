import React, { ReactElement, ReactText } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

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

const defaultIconButtonStyles = {
  textColor: 'gray.400',
  _groupHover: { color: 'gray.500' },
};

const activeIconButtonStyles = {
  textColor: 'gray.500',
};

const defaultTypographyStyles = {
  color: 'gray.600',
  _groupHover: { color: 'gray.900' },
};

const activeTypographyStyles = {
  color: 'gray.900',
};

const defaultBadgeStyles = {
  textColor: 'gray.600',
  _groupHover: { bg: 'gray.200' },
};

const activeBadgeStyles = {
  textColor: 'gray.900',
  bg: '#FFF',
};

export const SidebarItem = ({ children, path, count, icon, iconSelected, disabled, ...rest }: SidebarItemProps) => {
  const active = useRouteMatch(path);

  const iconButtonStyles = active ? activeIconButtonStyles : defaultIconButtonStyles;
  const typographyStyles = active ? activeTypographyStyles : defaultTypographyStyles;
  const badgeStyles = active ? activeBadgeStyles : defaultBadgeStyles;

  return (
    <Flex
      w="100%"
      h="40px"
      borderRadius="6px"
      disabled={disabled}
      _disabled={{ pointerEvents: 'none', opacity: '0.6' }}
      role="group"
      {...rest}
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
            {icon && iconSelected && (
              <IconButton
                icon={active ? iconSelected : icon}
                size="md"
                variant="link"
                aria-label={`${children}`}
                _focus={{ boxShadow: 'none' }}
                {...iconButtonStyles}
              />
            )}
            <Typography size="sm" weight="medium" pl={icon && iconSelected ? '4px' : '12px'} {...typographyStyles}>
              {children}
            </Typography>
          </HStack>
          {count && <Badge {...badgeStyles}>{count}</Badge>}
        </HStack>
      </Link>
    </Flex>
  );
};
