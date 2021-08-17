import './styles/Inter.css';

import React, { memo } from 'react';
import { ChakraProvider, ChakraProviderProps, ColorModeScript } from '@chakra-ui/react';
import type { Styles } from '@chakra-ui/theme-tools';

import { createTheme } from './overwrites';

export interface ThemeProviderProps extends Omit<ChakraProviderProps, 'theme'> {
  globalStyles?: Styles['global'];
}

export const ThemeProvider = memo(({ children, globalStyles = {}, ...props }: ThemeProviderProps) => {
  const theme = createTheme(globalStyles);

  return (
    <ChakraProvider theme={theme} {...props}>
      {children}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  );
});
