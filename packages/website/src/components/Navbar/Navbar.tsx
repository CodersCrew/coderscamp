import { useState } from 'react';
import ReactHeadroom from 'react-headroom';

import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useTheme } from '@coderscamp/ui/hooks/useTheme';

import { useRecruitmentModal } from '@/components/RecruitmentModal';
import { MENTOR_RECRUITMENT_FORM_URL } from '@/constants';

import { externalLinkBaseProps } from '../ExternalLink';
import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

export const Navbar = () => {
  const { zIndices } = useTheme();
  const [hasShadow, setHasShadow] = useState(false);
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'md' } as const);
  const { openModal } = useRecruitmentModal();

  return (
    <ReactHeadroom
      style={{ zIndex: zIndices.docked }}
      onPin={() => setHasShadow(true)}
      onUnfix={() => setHasShadow(false)}
    >
      <Center bgColor="white" shadow={hasShadow ? 'large' : undefined}>
        <HStack
          py="16px"
          px={{ base: '8px', sm: '18px', md: '24px', lg: '40px' }}
          width="min(1920px, 100%)"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
        >
          {baseNavbar}
          <HStack spacing="12px">
            <Button
              size={buttonSize}
              color="brand"
              as="a"
              href={MENTOR_RECRUITMENT_FORM_URL}
              {...externalLinkBaseProps}
            >
              Zostań mentorem
            </Button>
            <Button size={buttonSize} onClick={() => openModal('participant')}>
              Zapisz się na kurs
            </Button>
          </HStack>
        </HStack>
      </Center>
    </ReactHeadroom>
  );
};
