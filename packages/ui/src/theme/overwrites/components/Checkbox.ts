function baseStyleControl() {
  const disabledCbColorLight = 'gray.100';

  return {
    _checked: {
      _active: {
        bg: `brand.700`,
        borderColor: `brand.700`,
      },
      _disabled: {
        bg: disabledCbColorLight,
        borderColor: disabledCbColorLight,
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
        borderColor: disabledCbColorLight,
      },
      _active: {
        bg: disabledCbColorLight,
        borderColor: disabledCbColorLight,
      },
    },
  };
}

const baseStyle = () => ({
  control: baseStyleControl(),
});
const defaultProps = {
  colorScheme: 'brand',
  borderRadius: 2,
};

export const Checkbox = { baseStyle, defaultProps };
