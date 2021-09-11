import React, { useState } from 'react';
import ReactHeadroom from 'react-headroom';
import Link from 'next/link';

import { Center } from '@coderscamp/ui/components/Center';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useTheme } from '@coderscamp/ui/hooks/useTheme';
import { LogoBlackHorizontal, LogoBlackSquare } from '@coderscamp/ui/svg/logos';

import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

const logoProps = {
  cursor: 'pointer',
  maxWidth: '280px',
  height: '40px',
};

export const Navbar = () => {
  const Logo = useBreakpointValue({ base: LogoBlackSquare, xl: LogoBlackHorizontal } as const, 'base');
  const { zIndices } = useTheme();
  const [hasShadow, setHasShadow] = useState(false);
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);

  return (
    <ReactHeadroom
      style={{ zIndex: zIndices.docked }}
      onPin={() => setHasShadow(true)}
      onUnfix={() => setHasShadow(false)}
    >
      <Center
        pt={{ base: '32px', lg: '18px' }}
        pb="18px"
        px={{ base: '32px', lg: '40px' }}
        bgColor="white"
        width="100%"
        shadow={hasShadow ? 'large' : undefined}
      >
        <HStack width="min(1920px, 100%)" justifyContent="space-between">
          <Link href="/">{Logo && <Logo {...logoProps} />}</Link>
          {baseNavbar}
        </HStack>
      </Center>
    </ReactHeadroom>
  );
};
