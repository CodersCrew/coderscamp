import './styles/Inter.css';

import React from 'react';
import { ChakraProvider, ChakraProviderProps, ColorModeScript } from '@chakra-ui/react';

import { theme } from './overwrites';

type ThemeProviderProps = Omit<ChakraProviderProps, 'theme'>;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <ChakraProvider theme={theme} {...props}>
      {children}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </ChakraProvider>
  );
};
