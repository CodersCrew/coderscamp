import { mode } from '@chakra-ui/theme-tools';

const parts = ['container', 'control', 'label', 'icon'];

function baseStyleControl(props: Record<string, any>) {
  const { colorScheme: c } = props;
  const disabledCbColorLight = 'gray.100';

  return {
    _checked: {
      _active: {
        bg: mode(`${c}.700`, `${c}.200`)(props),
        borderColor: mode(`${c}.700`, `${c}.200`)(props),
      },
      _disabled: {
        bg: mode(disabledCbColorLight, 'transparent')(props),
        borderColor: mode(disabledCbColorLight, 'transparent')(props),
      },
    },
    _hover: {
      borderColor: mode(`gray.400`, `gray.300`)(props),
    },
    _active: {
      borderColor: mode(`gray.500`, `gray.200`)(props),
    },
    _disabled: {
      _hover: {
        borderColor: mode(disabledCbColorLight, `gray.300`)(props),
      },
      _active: {
        borderColor: mode(disabledCbColorLight, `gray.300`)(props),
      },
    },
  };
}

const baseStyle = (props: Record<string, any>) => ({
  control: baseStyleControl(props),
});

// eslint-disable-next-line import/no-default-export
export default { parts, baseStyle };
