import React, { ChangeEvent, ReactText } from 'react';
import { Checkbox as ChakraCheckbox, forwardRef, HTMLChakraProps, UseCheckboxProps } from '@chakra-ui/react';

// We need to explicitly overwrite aria-invalid as forwardRef tries to put there values that Chakra doesn't support
type Overwrites = Pick<UseCheckboxProps, 'aria-invalid'>;

export interface CheckboxProps extends Omit<HTMLChakraProps<'div'>, keyof UseCheckboxProps>, Overwrites {
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
    return (
      <ChakraCheckbox
        ref={ref}
        borderRadius={2}
        size={size}
        isChecked={checked}
        colorScheme="brand"
        isDisabled={disabled}
        {...props}
      />
    );
  },
);
