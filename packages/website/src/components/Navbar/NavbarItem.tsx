import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Typography } from '@coderscamp/ui/components/Typography';

export interface NavbarItemProps {
  current?: boolean;
  text: string;
  href: string;
}
const commonStyle = {
  size: 'md',
  lineHeight: '24px',
  mx: '24px',
  cursor: 'pointer',
} as const;

const selectedTypographyStyles = {
  color: 'gray.700',
  weight: 'bold',
  fontStyle: 'normal',
  textDecoration: 'underline',
  textDecorationColor: 'brand.500',
  textDecorationThickness: '4px',
  textUnderlineOffset: '6px',
} as const;

const baseTypographyStyles = {
  color: 'gray.500',
  weight: 'medium',
  _hover: { color: 'gray.600' },
} as const;

export const NavbarItem = ({ text, href }: NavbarItemProps) => {
  const { route } = useRouter();
  const usedTypographyStyles = route === href ? selectedTypographyStyles : baseTypographyStyles;

  return (
    <Typography {...usedTypographyStyles} {...commonStyle}>
      <Link href={href}>{text}</Link>
    </Typography>
  );
};
