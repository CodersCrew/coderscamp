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
          boxShadow: '0px 0px 0px 3px rgba(56, 189, 248, 0.6)',
        },
        _hover: {
          border: '1px solid #9CA3AF',
        },
        _invalid: {
          border: '2px solid #EF4444',
        },
      },
    },
  },
};
