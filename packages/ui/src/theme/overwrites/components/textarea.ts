export const Textarea = {
  baseStyle: {
    borderColor: 'gray.300',
  },
  variants: {
    borderColor: 'gray.300',
    outline: {
      borderRadius: '6px',
      _focus: {
        boxShadow: 'outline',
      },
      _disabled: {
        borderColor: 'gray.300',
      },
      _hover: {
        borderColor: 'gray.400',
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
