import React, { ReactText } from 'react';
import { Box, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

import { useFieldContextSize } from '../FormControl/FieldContext';
import { Typography } from '../Typography';

type LabelSizeProps = 'sm' | 'md' | 'lg';

export interface LabelProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[];
  size?: LabelSizeProps;
  required?: boolean;
}

export const Label = forwardRef<LabelProps, 'label'>(({ size, required, children, ...props }, ref) => {
  const labelSize = useFieldContextSize(size);

  return (
    <Typography {...props} as="label" ref={ref} color="gray.700" weight="medium" size={labelSize}>
      {children}
      {required && (
        <Box as="span" color="red.600">
          *
        </Box>
      )}
    </Typography>
  );
});
