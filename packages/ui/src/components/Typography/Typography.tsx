import React, { ReactNode } from 'react';
import { Box, forwardRef, HTMLChakraProps, ResponsiveValue } from '@chakra-ui/react';

import type { OmitForbiddenProps } from '../../types';

type TypographyVariant = 'span' | 'div' | 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';

type TypographyFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';

type TypographyFontWeight = 'normal' | 'medium' | 'bold' | 'extrabold';

export interface TypographyProps extends OmitForbiddenProps<HTMLChakraProps<'div'>> {
  children: ReactNode | ReactNode[];
  as?: TypographyVariant;
  size?: ResponsiveValue<TypographyFontSize>;
  weight?: TypographyFontWeight;
}

const anchorStyle = {
  color: 'brand.500',
  textDecoration: 'underline',
  _hover: { color: 'brand.600' },
  _active: { color: 'brand.700' },
};

export const Typography = forwardRef<TypographyProps, 'div'>(
  ({ as = 'div', size = 'md', weight = 'normal', children, ...props }, ref) => {
    const stylesForLink = as === 'a' && anchorStyle;

    return (
      <Box
        as={as}
        fontSize={size}
        lineHeight={size}
        letterSpacing={size}
        ref={ref}
        fontWeight={weight}
        {...props}
        {...stylesForLink}
      >
        {children}
      </Box>
    );
  },
);
