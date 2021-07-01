import React, { ReactNode, ReactText } from 'react';
import { Box, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type TypographyVariant = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

type TypographyFontWeight = 'regular' | 'medium';

type RemoveCommonValues<Type, TOmit> = {
  [Property in keyof Type]: TOmit extends Record<Property, infer U> ? Exclude<Type[Property], U> : Type[Property];
};

type Id<Type> = Record<string, unknown> & { [P in keyof Type]: Type[P] };
type ConditionalProps<Type, TKey extends keyof TCase, TCase extends Partial<Type>> =
  | Id<Omit<Type, keyof TCase> & TCase>
  | Id<RemoveCommonValues<Type, Pick<TCase, TKey>>>;

export interface TypographyProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[] | ReactNode | ReactNode[];
  as?: TypographyVariant | 'a';
  size?: TypographyFontSize;
  weight?: TypographyFontWeight;
}
export interface TypographyPropsForAnchor extends TypographyProps {
  href: string;
  as: 'a';
}

export type IsAnchor = ConditionalProps<TypographyProps, 'as', TypographyPropsForAnchor>;

const anchorStyle = {
  color: 'brand.500',
  textDecoration: 'underline',
  _hover: { color: 'brand.600' },
  _active: { color: 'brand.700' },
};

export const Typography: React.FC<IsAnchor> = forwardRef(
  ({ as = 'div', size = 'md', weight = 'regular', children, ...props }, ref) => {
    const stylesForLink = as === 'a' && anchorStyle;
    return (
      <Box as={as} fontSize={size} ref={ref} fontWeight={weight} {...props} {...stylesForLink}>
        {children}
      </Box>
    );
  },
);
