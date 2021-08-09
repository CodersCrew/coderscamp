import React from 'react';
import { RadioGroup as ChakraRadioGroup, RadioGroupProps as ChakraRadioGroupProps } from '@chakra-ui/react';

import { useFieldContextSize } from '../FormControl/FieldContext';
import { RadioSize } from '../Radio';
import { Stack, StackProps } from '../Stack';

export interface RadioGroupProps extends Omit<StackProps, 'onChange'> {
  size?: RadioSize;
  name: ChakraRadioGroupProps['name'];
  value: ChakraRadioGroupProps['value'];
  onChange: ChakraRadioGroupProps['onChange'];
}

const spacings: Record<RadioSize, string> = {
  md: '8px',
  lg: '12px',
};

export const RadioGroup = ({ onChange, value, name, children, size, ...props }: RadioGroupProps) => {
  const radioGroupSize = useFieldContextSize(size, 'sm');

  return (
    <ChakraRadioGroup value={value} name={name} onChange={onChange} size={radioGroupSize}>
      <Stack spacing={spacings[radioGroupSize]} {...props}>
        {children}
      </Stack>
    </ChakraRadioGroup>
  );
};

RadioGroup.displayName = 'RadioGroup';
