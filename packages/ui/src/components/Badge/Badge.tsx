import React, { ReactText } from 'react';
import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type BadgeVariant = 'solid' | 'outline' | 'subtle';

type BadgeSize = 'small' | 'large';

type BadgeColor = 'default' | 'brand' | 'blue' | 'green' | 'orange' | 'red';

export interface BadgeProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[];
  /**
   * Style variant of the badge
   */
  variant?: BadgeVariant;
  /**
   * Color variant of the badge
   */
  color?: BadgeColor;
  /**
   * Determines badge's paddings, font size, line height and border radius.
   */
  size?: BadgeSize;
  onClick?: ChakraBadgeProps['onClick'];
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

export const Badge = forwardRef<BadgeProps, 'div'>(
  ({ variant = 'subtle', size = 'small', color = 'default', children, ...props }, ref) => {
    return (
      <ChakraBadge
        variant={variant}
        size={size}
        colorScheme={color}
        ref={ref}
        fontWeight={500}
        {...(size === 'small' ? { ...smallStyleProps } : { ...largeStyleProps })}
        {...props}
      >
        {children}
      </ChakraBadge>
    );
  },
);
