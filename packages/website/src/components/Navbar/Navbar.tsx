import React, { useState } from 'react';
import ReactHeadroom from 'react-headroom';
import Link from 'next/link';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';
import { useTheme } from '@coderscamp/ui/hooks/useTheme';
import { LogoBlackHorizontal, LogoBlackSquare } from '@coderscamp/ui/svg/logos';

import { useRecruitmentModal } from '@/components/RecruitmentModal';
import { MENTOR_RECRUITMENT_FORM_URL } from '@/constants';

import { externalLinkBaseProps } from '../ExternalLink';
import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

export const Navbar = () => {
  const logoLayout = useBreakpointValue({ base: 'square', xl: 'horizontal' } as const);
  const buttonContainerWidth = useBreakpointValue({ base: '100%', lg: 'fit-content' } as const);
  const { openModal } = useRecruitmentModal();
  const [isGreaterThan560px] = useMediaQuery('(min-width: 560px)');
  const { zIndices } = useTheme();
  const [hasShadow, setHasShadow] = useState(false);
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const baseLogoProps = {
    cursor: 'pointer',
    maxWidth: '280px',
    height: '100%',
    maxHeight: '40px',
  };

  return (
    <ReactHeadroom
      style={{ zIndex: zIndices.docked }}
      onPin={() => setHasShadow(true)}
      onUnfix={() => setHasShadow(false)}
    >
      <Center bgColor="white" shadow={hasShadow ? 'large' : undefined}>
        <HStack
          pt={{ base: '32px', lg: '18px' }}
          pb="18px"
          px={{ base: '32px', lg: '40px' }}
          width="min(1920px, 100%)"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
        >
          <Link href="/">
            {logoLayout === 'horizontal' ? (
              <LogoBlackHorizontal {...baseLogoProps} />
            ) : (
              <LogoBlackSquare {...baseLogoProps} />
            )}
          </Link>

          {baseNavbar}
          {isGreaterThan560px && (
            <HStack spacing="12px" pr="24px" width={buttonContainerWidth} justifyContent="flex-end">
              <Button size="md" color="brand" as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
                Zostań mentorem
              </Button>
              <Button size="md" onClick={() => openModal('participant')}>
                Zapisz się na kurs
              </Button>
            </HStack>
          )}
        </HStack>
      </Center>
    </ReactHeadroom>
  );
};
