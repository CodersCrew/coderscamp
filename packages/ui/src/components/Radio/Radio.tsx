import React from 'react';
import { forwardRef, HTMLChakraProps, Radio as ChakraRadio } from '@chakra-ui/react';

export type RadioSize = 'md' | 'lg';

export interface RadioProps extends Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultChecked'> {
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
  value: string | number;
}

export const Radio = forwardRef<RadioProps, 'input'>(({ value, checked = false, disabled = false, ...props }, ref) => (
  <ChakraRadio ref={ref} value={value} isChecked={checked} isDisabled={disabled} {...props} />
));
