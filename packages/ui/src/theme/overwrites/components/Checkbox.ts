function baseStyleControl(props: Record<string, unknown>) {
  const { colorScheme: c } = props;
  const disabledCbColorLight = 'gray.100';

  return {
    _checked: {
      _active: {
        bg: `${c}.700`,
        borderColor: `${c}.700`,
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

const baseStyle = (props: Record<string, unknown>) => ({
  control: baseStyleControl(props),
});
const defaultProps = {
  colorScheme: 'brand',
  borderRadius: 2,
};

export const Checkbox = { baseStyle, defaultProps };
