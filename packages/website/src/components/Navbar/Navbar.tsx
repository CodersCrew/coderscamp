import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';

import { useRecruitmentModal } from '@/components/RecruitmentModal';

import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

export const Navbar = () => {
  const [isSmallerThan370px] = useMediaQuery('(max-width: 370px)');
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const { openModal } = useRecruitmentModal();

  return (
    <Center width="100%">
      <HStack
        py="18px"
        px={{ base: '8px', sm: '18px', md: '24px', lg: '40px' }}
        width="min(1920px, 100%)"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        {baseNavbar}
        <Flex overflow="hidden">
          <Button fontSize={isSmallerThan370px ? 'xs' : 'md'} size="md" mr="12px" onClick={() => openModal('mentor')}>
            Zostań mentorem
          </Button>
          <Button
            fontSize={isSmallerThan370px ? 'xs' : 'md'}
            size="md"
            color="brand"
            onClick={() => openModal('participant')}
          >
            Zapisz się na kurs
          </Button>
        </Flex>
      </HStack>
    </Center>
  );
};
