import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const SolidDashboardIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
  <Icon viewBox="0 0 24 24" {...props} ref={svgRef}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor" />
  </Icon>
));

SolidDashboardIcon.displayName = 'SolidDashboardIcon';
