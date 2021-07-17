import React from 'react';
import { RadioGroup as ChakraRadioGroup, RadioGroupProps as ChakraRadioGroupProps } from '@chakra-ui/react';

import { RadioSize } from '../Radio';
import { Stack, StackProps } from '../Stack';

export interface RadioGroupProps extends Omit<StackProps, 'onChange'> {
  size?: RadioSize;
  name: ChakraRadioGroupProps['name'];
  value: ChakraRadioGroupProps['value'];
  onChange: ChakraRadioGroupProps['onChange'];
}

export const RadioGroup = ({ onChange, value, name, children, size = 'md', ...props }: RadioGroupProps) => (
  <ChakraRadioGroup value={value} name={name} onChange={onChange} size={size}>
    <Stack {...props}>{children}</Stack>
  </ChakraRadioGroup>
);
