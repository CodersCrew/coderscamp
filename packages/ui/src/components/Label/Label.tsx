import React, { ReactText } from 'react';
import { Box, FormLabel, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type LabelSizeProps = 'sm' | 'md' | 'lg';

export interface LabelProps extends HTMLChakraProps<'label'> {
  children: ReactText | ReactText[];
  size?: LabelSizeProps;
  required?: boolean;
}

export const Label = forwardRef<LabelProps, 'label'>(({ size = 'sm', required = false, children, ...props }, ref) => {
  return (
    <FormLabel ref={ref} color="gray.700" fontSize={size} required={required} {...props}>
      {children}
      {required && (
        <Box as="span" color="red.600">
          *
        </Box>
      )}
    </FormLabel>
  );
});
