import React from 'react';
import { RadioGroup as ChakraRadioGroup, RadioGroupProps as ChakraRadioGroupProps } from '@chakra-ui/react';

import { Stack, StackProps } from '../Stack';

type RadioGroupSize = 'md' | 'lg';

export interface RadioGroupProps extends Omit<StackProps, 'onChange'> {
  size?: RadioGroupSize;
  name: ChakraRadioGroupProps['name'];
  value: ChakraRadioGroupProps['value'];
  onChange: ChakraRadioGroupProps['onChange'];
}

export const RadioGroup = ({ onChange, value, name, children, size = 'md', ...props }: RadioGroupProps) => (
  <ChakraRadioGroup value={value} name={name} onChange={onChange} size={size}>
    <Stack {...props}>{children}</Stack>
  </ChakraRadioGroup>
);
