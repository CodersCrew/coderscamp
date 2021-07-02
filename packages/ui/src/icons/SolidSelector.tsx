import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SolidSelectorIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
  <Icon
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={svgRef}
  >
    <path
      d="M6.344 14.397h11.308L12 20.054l-5.656-5.657zM11.993 9.589H6.34l5.653-5.657 5.652 5.657h-5.652z"
      fill="currentColor"
    />
  </Icon>
));

SolidSelectorIcon.displayName = 'SolidSelectorIcon';
