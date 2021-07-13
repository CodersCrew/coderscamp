export const NumberInput = {
  sizes: {
    sm: {
      field: {
        height: '32px',
        padding: '1px 0px 1px 12px',
      },
    },
    md: {
      field: {
        height: '40px',
        padding: '1px 0px 1px 16px',
      },
    },
    lg: {
      field: {
        height: '48px',
        padding: '1px 0px 1px 16px',
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderRadius: '6px',
        _focus: {
          boxShadow: 'outline',
        },
        _hover: {
          borderColor: 'gray.400',
        },
        _invalid: {
          borderWidth: '2px',
          borderColor: 'red.500',
        },
      },
    },
  },
};
