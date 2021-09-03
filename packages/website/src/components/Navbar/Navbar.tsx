import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { Link } from '@coderscamp/ui/components/Link';
import { Logo } from '@coderscamp/ui/components/Logo';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';

import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';
import { NavActionButtons } from './NavActionButtons';

export const Navbar = () => {
  const logoLayout = useBreakpointValue({ base: 'square', xl: 'horizontal' } as const);
  const [isGreaterThan560px] = useMediaQuery('(min-width: 560px)');
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);

  return (
    <Center width="100%">
      <HStack
        pt={{ base: '32px', lg: '18px' }}
        px={{ base: '32px', lg: '40px' }}
        width="min(1920px, 100%)"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        {logoLayout && (
          <Link href="/">
            <Logo maxWidth="280px" color="black" layout={logoLayout} style={{ cursor: 'pointer' }} />
          </Link>
        )}
        {baseNavbar}
        {isGreaterThan560px && <NavActionButtons />}
      </HStack>
    </Center>
  );
};
