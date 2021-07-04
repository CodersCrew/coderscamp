import React, { FocusEventHandler, MouseEventHandler, ReactElement } from 'react';
import { forwardRef, IconButton as ChakraIconButton } from '@chakra-ui/react';

type IconButtonSize = 'sm' | 'md' | 'lg' | 'xs';

type IconButtonColor = 'default' | 'brand' | 'danger';

type IconButtonVariant = 'link' | 'outline' | 'solid' | 'ghost';

export interface IconButtonProps {
  icon: ReactElement;
  /**
   * Color variant of the icon button
   */
  color?: IconButtonColor;
  /**
   * Determines button's width, height and icon's size.
   */
  size?: IconButtonSize;
  /**
   * Style variant of the icon button
   */
  variant?: IconButtonVariant;
  /**
   * Accessible name that describes a component's purpose
   */
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
