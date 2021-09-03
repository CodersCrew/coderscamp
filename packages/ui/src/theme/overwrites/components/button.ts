import type { ComponentStyleConfig } from '@chakra-ui/react';
import { SystemStyleFunction } from '@chakra-ui/theme-tools';

const iconSize: Record<string, string> = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '28px',
};

const linkVariant: SystemStyleFunction = ({ size }) => ({
  minWidth: iconSize[size ?? 'md'],
  _hover: {
    textDecoration: 'none',
  },
});

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'medium',
  },
  sizes: {
    xs: { svg: { height: iconSize.xs, width: iconSize.xs } },
    sm: { svg: { height: iconSize.sm, width: iconSize.sm } },
    md: { svg: { height: iconSize.md, width: iconSize.md } },
    lg: { svg: { height: iconSize.lg, width: iconSize.lg } },
  },
  variants: {
    link: linkVariant,
  },
};
