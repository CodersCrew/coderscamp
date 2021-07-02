import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const OutlinedDashboardIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
  <Icon viewBox="0 0 24 24" {...props} ref={svgRef}>
    <path
      d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
      fill="currentColor"
    />
  </Icon>
));

OutlinedDashboardIcon.displayName = 'OutlinedDashboardIcon';
