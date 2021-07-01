import React, { ReactNode, ReactText } from 'react';
import { Box, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type TypographyVariant = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

type TypographyFontWeight = 'regular' | 'medium';

type RemoveCommonValues<T, TOmit> = {
  [P in keyof T]: TOmit extends Record<P, infer U> ? Exclude<T[P], U> : T[P];
};

type Omit<T, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>; // not needed in 3.5
type Id<T> = {} & { [P in keyof T]: T[P] };
type ConditionalProps<T, TKey extends keyof TCase, TCase extends Partial<T>> =
  | Id<Omit<T, keyof TCase> & TCase>
  | Id<RemoveCommonValues<T, Pick<TCase, TKey>>>;

export interface TypographyProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[] | ReactNode | ReactNode[];
  as?: TypographyVariant | 'a';
  size?: TypographyFontSize;
  weight?: TypographyFontWeight;
}
export interface TypographyPropsForAnchor extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[] | ReactNode | ReactNode[];
  href: string;
  as: 'a';
  size?: TypographyFontSize;
  weight?: TypographyFontWeight;
}

export type AsAnchor = ConditionalProps<TypographyProps, 'as', TypographyPropsForAnchor>;

const anchorStyle = {
  color: 'brand.500',
  textDecoration: 'underline',
  _hover: { color: 'brand.600' },
  _active: { color: 'brand.700' },
};

export const Typography: React.FC<AsAnchor> = forwardRef(
  ({ as = 'div', size = 'md', weight = 'regular', children, ...props }, ref) => {
    const isAnchor = as === 'a' && anchorStyle;
    return (
      <Box as={as} fontSize={size} ref={ref} fontWeight={weight} {...props} {...isAnchor}>
        {children}
      </Box>
    );
  },
);
