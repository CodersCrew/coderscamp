import React, { ReactElement, ReactText } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
  HTMLChakraProps,
} from '@chakra-ui/react';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

type ButtonColor = 'default' | 'brand' | 'danger';

export interface ButtonProps extends HTMLChakraProps<'button'> {
  children: ReactText | ReactText[];
  /**
   * Style variant of the button
   */
  variant?: ButtonVariant;
  /**
   * Color variant of the button
   */
  color?: ButtonColor;
  /**
   * Determines button's paddings and text size.
   */
  size?: ButtonSize;
  /**
   * If `true`, the button will be disabled and show a spinner
   */
  isLoading?: boolean;
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * If added, the button will show an icon before the button's label
   */
  icon?: ReactElement;
  onClick?: ChakraButtonProps['onClick'];
  onFocus?: ChakraButtonProps['onFocus'];
  onBlur?: ChakraButtonProps['onBlur'];
}

const getSchemeFromColor = (color: ButtonColor): ChakraButtonProps['colorScheme'] => {
  if (color === 'danger') return 'red';
  if (color === 'brand') return 'brand';

  return 'gray';
};

export const Button = forwardRef<ButtonProps, 'button'>(
  ({ variant = 'solid', size = 'md', isLoading = false, color = 'default', disabled = false, icon, ...props }, ref) => {
    return (
      <ChakraButton
        variant={variant}
        size={size}
        isLoading={isLoading}
        colorScheme={getSchemeFromColor(color)}
        ref={ref}
        isDisabled={disabled}
        leftIcon={icon}
        {...props}
      />
    );
  },
);
