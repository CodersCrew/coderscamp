import React, { ReactNode } from 'react';
import { forwardRef, HTMLChakraProps } from '@chakra-ui/react';

import { VStack } from '../Stack';
import { defaultFieldContextValue, FieldContextProvider, FieldContextValue } from './FieldContext';

export interface FormControlProps extends Partial<FieldContextValue>, HTMLChakraProps<'div'> {
  children: ReactNode;
}

const spacings: Record<FieldContextValue['size'], string> = {
  sm: '4px',
  md: '6px',
  lg: '8px',
};

export const FormControl = forwardRef<FormControlProps, 'div'>(
  ({ size = defaultFieldContextValue.size, children, ...props }, ref) => {
    return (
      <FieldContextProvider value={{ size }}>
        <VStack {...props} align="flex-start" spacing={spacings[size]} ref={ref}>
          {children}
        </VStack>
      </FieldContextProvider>
    );
  },
);
