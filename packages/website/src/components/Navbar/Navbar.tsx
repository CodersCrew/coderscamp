import Headroom from 'react-headroom';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { useRecruitmentModal } from '@/components/RecruitmentModal';

import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

const headroomStyles = {
  zIndex: 1000,
  background: 'rgba(255, 255, 255)',
  boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
} as const;

export const Navbar = () => {
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'md' } as const);
  const { openModal } = useRecruitmentModal();

  return (
    <Headroom style={headroomStyles}>
      <HStack
        py="18px"
        px={{ base: '8px', sm: '18px', md: '24px', lg: '40px' }}
        width="min(1920px, 100%)"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        {baseNavbar}
        <Flex>
          <Button size={buttonSize} mr="12px" onClick={() => openModal('mentor')}>
            Zostań mentorem
          </Button>
          <Button size={buttonSize} color="brand" onClick={() => openModal('participant')}>
            Zapisz się na kurs
          </Button>
        </Flex>
      </HStack>
    </Headroom>
  );
};
