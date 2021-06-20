import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { styles } from './styles';
import { typography } from './typography';

export const theme = extendTheme({
  ...typography,
  styles,
  colors,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
