import React, { ReactNode, ReactText } from 'react';
import { Box, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type TypographyVariant = 'span' | 'div' | 'a' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

type TypographyFontWeight = 'regular' | 'medium';

export interface BoxProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[] | ReactNode | ReactNode[];
  as?: TypographyVariant;
  size?: TypographyFontSize;
  weight?: TypographyFontWeight;
}

export const Typography = forwardRef<BoxProps, 'div'>(
  ({ as = 'div', size = 'md', weight = 'regular', children, ...props }, ref) => {
    return (
      <Box as={as} fontSize={size} ref={ref} fontWeight={weight} {...props}>
        {children}
      </Box>
    );
  },
);
