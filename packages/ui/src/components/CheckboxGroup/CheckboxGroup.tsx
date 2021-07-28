import React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup, CheckboxGroupProps as ChakraCheckboxGroupProps } from '@chakra-ui/react';

import { Stack, StackProps } from '../Stack';

export interface CheckboxGroupProps extends Omit<StackProps, 'onChange'> {
  value: ChakraCheckboxGroupProps['value'];
  onChange: ChakraCheckboxGroupProps['onChange'];
  size?: 'md' | 'lg';
  disabled?: boolean;
}

export const CheckboxGroup = ({ value, onChange, children, disabled = false, size = 'md', ...props }: CheckboxGroupProps) => (
  <ChakraCheckboxGroup value={value} onChange={onChange} size={size} isDisabled={disabled}>
    <Stack {...props}>{children}</Stack>
  </ChakraCheckboxGroup>
);
