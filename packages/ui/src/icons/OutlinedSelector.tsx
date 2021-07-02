import React, { forwardRef } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export const OutlinedSelectorIcon = forwardRef((props: Omit<IconProps, 'css'>, svgRef?: React.Ref<SVGSVGElement>) => (
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
      d="M12 20.324l-4.243-4.243 1.415-1.414L12 17.497l2.828-2.83 1.415 1.414L12 20.324zM12 6.502L9.172 9.33 7.757 7.917 12 3.674l4.243 4.243-1.415 1.414L12 6.5z"
      fill="currentColor"
    />
  </Icon>
));

OutlinedSelectorIcon.displayName = 'OutlinedSelectorIcon';
