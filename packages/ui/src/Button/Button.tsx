import React, { ComponentPropsWithoutRef, forwardRef, ReactText } from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

type ButtonColor = 'default' | 'primary' | 'danger';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactText | ReactText[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  color?: ButtonColor;
  disabled?: boolean;
}

const getSchemeFromColor = (color: ButtonColor): ChakraButtonProps['colorScheme'] => {
  if (color === 'danger') return 'red';
  if (color === 'primary') return 'brand';

  return 'gray';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', isLoading = false, color = 'default', disabled = false, ...props }, ref) => {
    return (
      <ChakraButton
        variant={variant}
        size={size}
        isLoading={isLoading}
        colorScheme={getSchemeFromColor(color)}
        ref={ref}
        isDisabled={disabled}
        {...props}
      />
    );
  },
);
