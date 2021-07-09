import React from 'react';
import { forwardRef, HTMLChakraProps, Radio as ChakraRadio } from '@chakra-ui/react';

export type RadioSize = 'md' | 'lg';

export interface RadioProps extends Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultChecked'> {
  /**
   * Determines radio's and text size.
   */
  size?: RadioSize;
  /**
   * Determines state of the radio.
   */
  checked?: boolean;
  /**
   * Determines if input is disabled.
   */
  disabled?: boolean;
  value: string | number;
}

export const Radio = forwardRef<RadioProps, 'input'>(
  ({ value, checked = false, disabled = false, size = 'md', ...props }, ref) => {
    return (
      <ChakraRadio
        colorScheme="brand"
        ref={ref}
        value={value}
        isChecked={checked}
        isDisabled={disabled}
        size={size}
        {...props}
      />
    );
  },
);
