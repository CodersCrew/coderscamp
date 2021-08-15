import { extendTheme } from '@chakra-ui/react';
import type { Styles } from '@chakra-ui/theme-tools';

import { components } from './components';
import { foundations } from './foundations';
import { createStyles } from './styles';

export const createTheme = (globalStyles: Styles['global']) =>
  extendTheme({
    ...foundations,
    styles: createStyles(globalStyles),
    components,
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  });
