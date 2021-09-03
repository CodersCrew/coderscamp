import './styles/Inter.css';

import React, { memo, ReactNode } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { Styles } from '@chakra-ui/theme-tools';

import { createTheme } from './overwrites';

export interface ThemeProviderProps {
  children: ReactNode;
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
