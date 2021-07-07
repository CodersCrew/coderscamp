import React from 'react';
import { forwardRef, HTMLChakraProps, Radio as ChakraRadio } from '@chakra-ui/react';

export type RadioSize = 'md' | 'lg';
export type RadioColor = 'default' | 'brand';

export interface RadioProps extends Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultChecked'> {
  /**
   * Determines radio's paddings and text size.
   */
  size?: RadioSize;
  /**
   * Determines state of the radio.
   */
  checked?: boolean;
  /**
   * If `true`, the radio will be disabled
   */
  disabled?: boolean;
  /**
   * Color variant of the radio
   */
  color?: RadioColor;
  value?: string | number;
}

export const Radio = forwardRef<RadioProps, 'div'>(
  ({ color = 'default', value, children = '', checked = false, disabled = false, size = 'md', ...props }, ref) => {
    const colorScheme = color === 'default' ? 'grey' : color;

    return (
      <ChakraRadio
        colorScheme={colorScheme}
        ref={ref}
        value={value}
        isChecked={checked}
        isDisabled={disabled}
        size={size}
        {...props}
      >
        {children}
      </ChakraRadio>
    );
  },
);
