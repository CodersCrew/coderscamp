export const Radio = {
  baseStyle: {
    control: {
      borderColor: 'gray.300',

      _hover: {
        borderColor: 'gray.400',
      },

      _active: {
        borderColor: 'gray.500',
      },

      _checked: {
        _active: {
          bg: 'brand.700',
          borderColor: 'brand.700',
        },
      },
    },
  },
  defaultProps: {
    colorScheme: 'brand',
  },
};
