export const Input = {
  sizes: {
    sm: {
      field: {
        padding: '6px 12px',
      },
    },
    md: {
      field: {
        padding: '8px 16px',
      },
    },
    lg: {
      field: {
        padding: '10px 16px',
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: 'gray.300',
        borderRadius: '6px',
        _focus: {
          background: 'white',
          boxShadow: 'outline',
        },
        _hover: {
          borderColor: 'gray.400',
        },
      },
    },
  },
};
