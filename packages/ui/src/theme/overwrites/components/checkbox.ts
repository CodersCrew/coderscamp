const DISABLED_COLOR = 'gray.100';

const baseStyle = {
  label: {
    color: 'gray.700',
  },
  control: {
    _checked: {
      _active: {
        bg: `brand.700`,
        borderColor: `brand.700`,
      },
      _disabled: {
        bg: DISABLED_COLOR,
        borderColor: DISABLED_COLOR,
      },
    },
    _hover: {
      borderColor: `gray.400`,
    },
    _active: {
      borderColor: `gray.500`,
    },
    _disabled: {
      _hover: {
        borderColor: DISABLED_COLOR,
      },
      _active: {
        bg: DISABLED_COLOR,
        borderColor: DISABLED_COLOR,
      },
    },
  },
};

const defaultProps = {
  colorScheme: 'brand',
  borderRadius: 2,
};

export const Checkbox = { baseStyle, defaultProps };
