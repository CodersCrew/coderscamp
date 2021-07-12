import { extendTheme } from '@chakra-ui/react';

import { components } from './components';
import { foundations } from './foundations';
import { styles } from './styles';

export const theme = extendTheme({
  ...foundations,
  styles,
  components,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components,
});
