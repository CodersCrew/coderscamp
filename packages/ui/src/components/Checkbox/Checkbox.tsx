import React, { ChangeEvent, ReactText } from 'react';
import {
  Checkbox as ChakraCheckbox,
  forwardRef,
  HTMLChakraProps,
  UseCheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

export interface CheckboxProps extends Omit<HTMLChakraProps<'div'>, keyof ChakraCheckboxProps> {
  children?: ReactText | ReactText[];
  value?: string | number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  name?: string;
  disabled?: boolean;
  size?: 'md' | 'lg';
}

export const Checkbox = forwardRef<CheckboxProps, 'input'>(
  ({ checked, disabled = false, size = 'md', ...props }, ref) => {
    const { 'aria-invalid': aria, ...restProps } = props;

    return (
      <ChakraCheckbox
        ref={ref}
        borderRadius={2}
        size={size}
        isChecked={checked}
        colorScheme="brand"
        isDisabled={disabled}
        {...restProps}
      />
    );
  },
);
