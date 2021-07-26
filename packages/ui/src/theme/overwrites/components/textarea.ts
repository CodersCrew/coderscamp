export const Textarea = {
  baseStyle: {
    filed: {
      borderColor: 'gray.300',
    },
  },
  variants: {
    outline: {
      borderRadius: '6px',
      _focus: {
        boxShadow: 'outline',
      },
      field: {
        _hover: {
          borderColor: 'gray.400',
        },
        _disabled: {
          borderColor: 'gray.300',
        },
      },
    },
  },
  sizes: {
    sm: {
      px: '12px',
      py: '6px',
    },
    md: {
      px: '16px',
      py: '8px',
    },
    lg: {
      px: '16px',
      py: '10px',
    },
  },
};
