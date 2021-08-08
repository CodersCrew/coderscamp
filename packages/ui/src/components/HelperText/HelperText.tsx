import React, { forwardRef, ReactText } from 'react';
import { HTMLChakraProps } from '@chakra-ui/react';

import { Typography } from '../Typography';

type HelperTextVariant = 'default' | 'warning' | 'error';

type HelperTextSize = 'sm' | 'md' | 'lg';

export interface HelperTextProps extends Omit<HTMLChakraProps<'div'>, 'as'> {
  variant?: HelperTextVariant;
  size?: HelperTextSize;
  children: ReactText | ReactText[];
}

const colors: Record<HelperTextVariant, string> = {
  error: 'red.600',
  warning: 'orange.600',
  default: 'gray.500',
};

export const HelperText = forwardRef<HTMLDivElement, HelperTextProps>(
  ({ children, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <Typography {...props} color={colors[variant]} size={size} ref={ref}>
        {children}
      </Typography>
    );
  },
);
