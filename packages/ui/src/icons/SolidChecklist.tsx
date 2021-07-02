import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SolidChecklistIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
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
      d="M11 4h10v2H11V4zm0 4h6v2h-6V8zm0 6h10v2H11v-2zm0 4h6v2h-6v-2zM3 4h6v6H3V4zm0 10h6v6H3v-6z"
      fill="currentColor"
    />
  </Icon>
));

SolidChecklistIcon.displayName = 'SolidChecklistIcon';
