import React, { ReactText } from 'react';
import { Checkbox as ChakraCheckbox, forwardRef, HTMLChakraProps, UseCheckboxProps } from '@chakra-ui/react';

// We need to explicitly overwrite aria-invalid as forwardRef tries to put there values that Chakra doesn't support
type Overwrites = Pick<UseCheckboxProps, 'aria-invalid'>;

export type CheckboxSize = 'md' | 'lg';

export interface CheckboxProps extends Omit<HTMLChakraProps<'div'>, keyof UseCheckboxProps>, Overwrites {
  children?: ReactText | ReactText[];
  value?: string | number;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  size?: CheckboxSize;
}

export const Checkbox = forwardRef<CheckboxProps, 'input'>(({ checked = false, disabled = false, ...props }, ref) => {
  return <ChakraCheckbox ref={ref} isChecked={checked} isDisabled={disabled} {...props} />;
});
