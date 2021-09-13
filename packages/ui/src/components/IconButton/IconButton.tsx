import React, { FocusEventHandler, MouseEventHandler, ReactElement } from 'react';
import type { HTMLChakraProps } from '@chakra-ui/react';
import { forwardRef, IconButton as ChakraIconButton } from '@chakra-ui/react';

import type { OmitForbiddenProps, SizeProps } from '../../types';

type IconButtonSize = 'sm' | 'md' | 'lg' | 'xs';

type IconButtonColor = 'default' | 'brand' | 'danger';

type IconButtonVariant = 'link' | 'outline' | 'solid' | 'ghost';

export interface IconButtonProps extends OmitForbiddenProps<HTMLChakraProps<'button'>, SizeProps> {
  icon: ReactElement;
  color?: IconButtonColor;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  'aria-label': string;
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
}

const fontSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
};

const colors = {
  danger: 'red',
  brand: 'brand',
  default: 'gray',
};

export const IconButton = forwardRef<IconButtonProps, 'button'>(({ size = 'sm', color = 'default', ...props }, ref) => {
  return (
    <ChakraIconButton
      ref={ref}
      size={size}
      colorScheme={colors[color]}
      fontSize={fontSizes[size]}
      borderRadius={6}
      {...props}
    />
  );
});
