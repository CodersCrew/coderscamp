import React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup, CheckboxGroupProps as ChakraCheckboxGroupProps } from '@chakra-ui/react';

import type { CheckboxSize } from '../Checkbox/Checkbox';
import { useFieldContextSize } from '../FormControl/FieldContext';
import { Stack, StackProps } from '../Stack';

export interface CheckboxGroupProps extends Omit<StackProps, 'onChange'> {
  value: ChakraCheckboxGroupProps['value'];
  onChange: ChakraCheckboxGroupProps['onChange'];
  size?: CheckboxSize;
  disabled?: boolean;
}

const spacings: Record<CheckboxSize, string> = {
  md: '8px',
  lg: '12px',
};

export const CheckboxGroup = ({ value, onChange, children, disabled = false, size, ...props }: CheckboxGroupProps) => {
  const checkboxGroupSize = useFieldContextSize(size, 'sm');

  return (
    <ChakraCheckboxGroup value={value} onChange={onChange} size={checkboxGroupSize} isDisabled={disabled}>
      <Stack spacing={spacings[checkboxGroupSize]} {...props}>
        {children}
      </Stack>
    </ChakraCheckboxGroup>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
