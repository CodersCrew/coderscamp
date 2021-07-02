import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const OutlinedRocketIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
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
      d="M15.502 20A6.523 6.523 0 0112 23.502 6.523 6.523 0 018.498 20h2.26c.326.489.747.912 1.242 1.243.495-.33.916-.754 1.243-1.243h2.259zM18 14.805l2 2.268V19H4v-1.927l2-2.268V9c0-3.483 2.504-6.447 6-7.545C15.496 2.553 18 5.517 18 9v5.805zM17.27 17L16 15.56V9c0-2.318-1.57-4.43-4-5.42C9.57 4.57 8 6.681 8 9v6.56L6.73 17h10.54zM12 11a2 2 0 110-4 2 2 0 010 4z"
      fill="currentColor"
    />
  </Icon>
));

OutlinedRocketIcon.displayName = 'OutlinedRocketIcon';
