export const Textarea = {
  baseStyle: {
    control: {
      _focus: {
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: '0.4',
      },
      _hover: {
        borderColor: 'gray.400',
      },
    },
    width: '12.5rem',
    height: '5rem',
  },
  sizes: {
    sm: {
      px: '0.75rem',
      py: '0.375rem',
    },
    md: {
      px: '1rem',
      py: '0.5rem',
    },
    lg: {
      px: '1rem',
      py: '0.625rem',
    },
    defaultProps: {
      size: 'md',
    },
  },
};
