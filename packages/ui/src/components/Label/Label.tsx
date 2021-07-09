import React, { ReactText } from 'react';
import { FormLabel, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

export type LabelSizeProps = 'sm' | 'md' | 'lg';

export interface LabelProps extends HTMLChakraProps<'label'> {
  children: ReactText | ReactText[];
  size?: LabelSizeProps;
  required?: boolean;
}

export const Label = forwardRef<LabelProps, 'label'>(({ size = 'sm', required, children, ...props }, ref) => {
  if (required) {
    return (
      <FormLabel ref={ref} color="gray.700" fontSize={size} required={required} {...props}>
        {children} <span style={{ color: 'red' }}>*</span>
      </FormLabel>
    );
  }
  return (
    <FormLabel ref={ref} color="gray.700" fontSize={size} required={required} {...props}>
      {children}
    </FormLabel>
  );
});
