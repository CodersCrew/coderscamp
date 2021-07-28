import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'medium',
  },
  sizes: {
    xs: {
      py: '4px',
      svg: {
        height: '16px',
        width: '16px',
      },
    },
    sm: {
      py: '6px',
      svg: {
        height: '20px',
        width: '20px',
      },
    },
    md: {
      py: '8px',
      svg: {
        height: '24px',
        width: '24px',
      },
    },
    lg: {
      py: '10px',
      svg: {
        height: '28px',
        width: '28px',
      },
    },
  },
  variants: {
    link: {
      _hover: {
        textDecoration: 'none',
      },
    },
  },
};
