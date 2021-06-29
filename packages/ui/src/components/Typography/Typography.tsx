import React, { ReactNode, ReactText } from 'react';
import { Box as ChakraTypography, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type TypographyVariant = 'span' | 'div' | 'a' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

type TypographyWeight = 'regular' | 'medium';

export interface TypographyProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[] | ReactNode | ReactNode[];
  as?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
}

export const Typography = forwardRef<TypographyProps, 'div'>(
  ({ as = 'div', size = 'md', weight = 'regular', ...props }, ref) => {
    return <ChakraTypography as={as} size={size} ref={ref} {...props} />;
  },
);
