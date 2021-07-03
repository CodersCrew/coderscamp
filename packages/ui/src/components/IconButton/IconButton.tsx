import React, { FocusEventHandler, MouseEventHandler, ReactElement } from 'react';
import { forwardRef, IconButton as ChakraIconButton, IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';

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
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  'aria-label'?: string;
}

const getColorScheme = (color: IconButtonColor): ChakraIconButtonProps['colorScheme'] => {
  if (color === 'danger') {
    return 'red';
  }

  if (color === 'brand') {
    return 'brand';
  }

  return 'gray';
};

const getFontSize = (size: IconButtonSize): ChakraIconButtonProps['fontSize'] => {
  if (size === 'sm') {
    return 16;
  }

  if (size === 'md') {
    return 20;
  }

  if (size === 'lg') {
    return 23;
  }

  return 13;
};

export const IconButton = forwardRef<IconButtonProps, 'button'>(
  ({ icon, size = 'sm', color = 'default', ...props }, ref) => {
    const ariaLabel = props['aria-label'] || 'Icon Button';

    return (
      <ChakraIconButton
        ref={ref}
        size={size}
        colorScheme={getColorScheme(color)}
        fontSize={getFontSize(size)}
        icon={icon}
        borderRadius={6}
        aria-label={ariaLabel}
        {...props}
      />
    );
  },
);
