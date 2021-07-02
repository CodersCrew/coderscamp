import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SolidCalendarIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
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
      d="M2 11h20v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9zm15-8h4a1 1 0 011 1v5H2V4a1 1 0 011-1h4V1h2v2h6V1h2v2z"
      fill="currentColor"
    />
  </Icon>
));

SolidCalendarIcon.displayName = 'SolidCalendarIcon';
