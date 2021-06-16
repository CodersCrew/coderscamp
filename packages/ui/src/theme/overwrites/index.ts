import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { styles } from './styles';

export const theme = extendTheme({
  styles,
  colors,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
