import React from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import { Typography, TypographyProps } from '@coderscamp/ui/components/Typography';

export interface NavbarItemProps {
  current?: boolean;
  text: string;
  href: string;
}
const commonStyle = {
  size: 'md',
  lineHeight: '24px',
  mx: '6',
  cursor: 'pointer',
} as const;

const SelectedTypography: React.FC<TypographyProps> = ({ children, ...restProps }) => (
  <Typography
    color="gray.700"
    weight="bold"
    fontStyle="normal"
    textDecoration="underline"
    textDecorationColor="brand.500"
    textDecorationThickness="4px"
    textUnderlineOffset="4px"
    {...commonStyle}
    {...restProps}
  >
    {children}
  </Typography>
);
const BaseTypography: React.FC<TypographyProps> = ({ children, ...restProps }) => (
  <Typography color="gray.500" weight="medium" _hover={{ color: 'gray.600' }} {...commonStyle} {...restProps}>
    {children}
  </Typography>
);

export const NavbarItem = ({ text, href }: NavbarItemProps) => {
  const { route } = useRouter();
  const UsedTypography = route === href ? SelectedTypography : BaseTypography;

  return (
    <UsedTypography>
      <Link href={href}>{text}</Link>
    </UsedTypography>
  );
};
