import React from 'react';
import { forwardRef, HTMLChakraProps, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<HTMLChakraProps<'input'>, 'readonly' | 'size'> {
  /**
   * Determines input's paddings and text size.
   */
  size?: InputSize;
  /**
   * If `true`, the input will be disabled
   */
  disabled?: boolean;
  value?: ChakraInputProps['value'];
  name?: ChakraInputProps['name'];
  onChange?: ChakraInputProps['onChange'];
}

export const Input = forwardRef<InputProps, 'input'>(({ size = 'md', disabled = false, ...props }, ref) => {
  return <ChakraInput size={size} isDisabled={disabled} ref={ref} {...props} />;
});
