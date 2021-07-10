import { extendTheme } from '@chakra-ui/react';

import { Checkbox } from './components';
import { foundations } from './foundations';
import { styles } from './styles';

export const theme = extendTheme({
  ...foundations,
  styles,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Checkbox,
  },
});
