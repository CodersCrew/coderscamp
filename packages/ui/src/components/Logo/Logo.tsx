import React, { MouseEventHandler } from 'react';
import { forwardRef, HTMLChakraProps, Image as ChakraImage } from '@chakra-ui/react';

import blackHorizontalLogo from '../../../images/LogoBlackHorizontal.svg';
import blackSquareLogo from '../../../images/LogoBlackSquare.svg';
import whiteHorizontalLogo from '../../../images/LogoWhiteHorizontal.svg';
import whiteSquareLogo from '../../../images/LogoWhiteSquare.svg';

type LayoutVariant = 'horizontal' | 'square';

type LogoColor = 'white' | 'black';

export interface LogoProps extends HTMLChakraProps<'img'> {
  layout?: LayoutVariant;
  color?: LogoColor;
  onClick?: MouseEventHandler;
}

const getSrcFromProps = (color: LogoColor, layout: LayoutVariant): string => {
  if (color === 'white' && layout === 'horizontal') return whiteHorizontalLogo;
  if (color === 'white' && layout === 'square') return whiteSquareLogo;
  if (color === 'black' && layout === 'horizontal') return blackHorizontalLogo;
  if (color === 'black' && layout === 'square') return blackSquareLogo;

  return './LogoWhiteHorizontal';
};

export const Logo = forwardRef<LogoProps, 'img'>(({ layout = 'horizontal', color = 'white', ...props }, ref) => {
  return (
    <ChakraImage
      alt="Logo CodersCamp"
      src={getSrcFromProps(color, layout)}
      layout={layout}
      color={color}
      ref={ref}
      {...props}
    />
  );
});
