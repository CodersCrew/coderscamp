import React, { useState } from 'react';
import ReactHeadroom from 'react-headroom';

import { Box } from '@coderscamp/ui/components/Box';
import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useTheme } from '@coderscamp/ui/hooks/useTheme';
import {
  LogoBlackHorizontal,
  LogoBlackSquare,
  PoweredByLiveChatHorizontal,
  PoweredByLiveChatVertical,
} from '@coderscamp/ui/svg/logos';

import { STRATEGIC_PARTNER_SECTION_ID } from '@/constants';

import { InternalLink } from '../InternalLink';
import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

const WideLogo = () => (
  <VStack spacing="6px" align="flex-end">
    <InternalLink href="/">
      <LogoBlackHorizontal maxWidth="280px" height="32px" />
    </InternalLink>
    <InternalLink href={`#${STRATEGIC_PARTNER_SECTION_ID}`}>
      <PoweredByLiveChatHorizontal height="16px" />
    </InternalLink>
  </VStack>
);

const NarrowLogo = () => (
  <HStack spacing="8px">
    <InternalLink href="/">
      <LogoBlackSquare height="40px" />
    </InternalLink>
    <Box width="1px" height="40px" bg="gray.400" />
    <InternalLink href={`#${STRATEGIC_PARTNER_SECTION_ID}`}>
      <PoweredByLiveChatVertical height="40px" />
    </InternalLink>
  </HStack>
);

export const Navbar = () => {
  const Logo = useBreakpointValue({ base: NarrowLogo, xl: WideLogo } as const, 'base') ?? NarrowLogo;
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
        px={{ base: '24px', md: '32px', lg: '40px', xl: '32px', '2xl': '40px' }}
        bgColor="white"
        width="100%"
        height="80px"
        shadow={hasShadow ? 'large' : undefined}
      >
        <Flex width="min(1920px, 100%)" justifyContent="space-between" alignItems="center">
          <Logo />

          {baseNavbar}
        </Flex>
      </Center>
    </ReactHeadroom>
  );
};
