export const NumberInput = {
  sizes: {
    sm: {
      field: {
        padding: '1px 0px 1px 12px',
      },
    },
    md: {
      field: {
        padding: '1px 0px 1px 16px',
      },
    },
    lg: {
      field: {
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
