import React, { ReactText } from 'react';
import { Badge as ChakraBadge, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type BadgeSize = 'small' | 'large';

type BadgeColor = 'default' | 'brand' | 'blue' | 'green' | 'orange' | 'red';

export interface BadgeProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[];
  /**
   * Color variant of the badge
   */
  color?: BadgeColor;
  /**
   * Determines badge's paddings, font size, line height and border radius.
   */
  size?: BadgeSize;
}

export const smallStyleProps = {
  padding: '2px 10px',
  borderRadius: '10px',
  lineHeight: '16px',
  fontSize: '12px',
};

export const largeStyleProps = {
  padding: '2px 12px',
  borderRadius: '12px',
  lineHeight: '20px',
  fontSize: '14px',
};

export const Badge = forwardRef<BadgeProps, 'div'>(({ size = 'small', color = 'default', children, ...props }, ref) => {
  const sizeProps = size === 'small' ? smallStyleProps : largeStyleProps;
  const colorScheme = color === 'default' ? 'gray' : color;

  return (
    <ChakraBadge
      textTransform="none"
      size={size}
      colorScheme={colorScheme}
      ref={ref}
      fontWeight={500}
      {...sizeProps}
      {...props}
    >
      {children}
    </ChakraBadge>
  );
});
