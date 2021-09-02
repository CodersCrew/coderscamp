import React, { ReactElement } from 'react';
import { Container } from '@chakra-ui/react';

export interface ContainerProps {
  children: ReactElement;
}

const widthValue = {
  base: '100%',
  sm: '100%',
  md: '100%',
  lg: 'min(960px, calc(100%-128px))',
  xl: '1080px',
  '2xl': '1280px',
} as const;
const paddingXValue = { base: '16px', sm: '32px', md: '64px', lg: '0' } as const;

export const SectionContainer = ({ children }: ContainerProps) => {
  return (
    <Container minW={widthValue} px={paddingXValue}>
      {children}
    </Container>
  );
};
