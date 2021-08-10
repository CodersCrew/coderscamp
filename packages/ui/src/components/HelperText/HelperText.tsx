import React, { forwardRef, ReactNode } from 'react';
import { HTMLChakraProps } from '@chakra-ui/react';

import { useFieldContextSize } from '../FormControl/FieldContext';
import { Typography } from '../Typography';

type HelperTextVariant = 'default' | 'warning' | 'error';

type HelperTextSize = 'sm' | 'md' | 'lg';

export interface HelperTextProps extends Omit<HTMLChakraProps<'div'>, 'as'> {
  variant?: HelperTextVariant;
  size?: HelperTextSize;
  children: ReactNode;
}

const colors: Record<HelperTextVariant, string> = {
  error: 'red.600',
  warning: 'orange.600',
  default: 'gray.500',
};

export const HelperText = forwardRef<HTMLDivElement, HelperTextProps>(
  ({ children, variant = 'default', size, ...props }, ref) => {
    const helperTextSize = useFieldContextSize(size);

    return (
      <Typography {...props} color={colors[variant]} size={helperTextSize} ref={ref}>
        {children}
      </Typography>
    );
  },
);
