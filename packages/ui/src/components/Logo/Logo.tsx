import React from 'react';
import { forwardRef, HTMLChakraProps, Image as ChakraImage } from '@chakra-ui/react';

import blackHorizontalLogo from '../../../images/LogoBlackHorizontal.svg';
import blackSquareLogo from '../../../images/LogoBlackSquare.svg';
import whiteHorizontalLogo from '../../../images/LogoWhiteHorizontal.svg';
import whiteSquareLogo from '../../../images/LogoWhiteSquare.svg';

type Layout = 'horizontal' | 'square';

type LogoColor = 'white' | 'black';

export interface LogoProps extends HTMLChakraProps<'img'> {
  layout?: Layout;
  color?: LogoColor;
}

const logosMap = {
  white: { horizontal: whiteHorizontalLogo, square: whiteSquareLogo },
  black: { horizontal: blackHorizontalLogo, square: blackSquareLogo },
};

export const Logo = forwardRef<LogoProps, 'img'>(({ layout = 'horizontal', color = 'white', ...props }, ref) => {
  return (
    <ChakraImage
      alt="Logo CodersCamp"
      src={logosMap[color][layout] as unknown as string}
      layout={layout}
      color={color}
      ref={ref}
      {...props}
    />
  );
});
