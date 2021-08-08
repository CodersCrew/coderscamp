import React from 'react';
import { forwardRef, HTMLChakraProps, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

import { useFieldContextSize } from '../FormControl/FieldContext';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<HTMLChakraProps<'input'>, 'readonly' | 'size'> {
  size?: InputSize;
  disabled?: boolean;
  value?: ChakraInputProps['value'];
  name?: ChakraInputProps['name'];
  onChange?: ChakraInputProps['onChange'];
}

export const Input = forwardRef<InputProps, 'input'>(({ size, disabled = false, ...props }, ref) => {
  const inputSize = useFieldContextSize(size);

  return <ChakraInput size={inputSize} isDisabled={disabled} ref={ref} {...props} />;
});
