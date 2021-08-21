import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';

import { forMentors, forParticipant } from '../Modals/Modal.data';
import { RecruitmentModal } from '../Modals/RecruitmentModal';
import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

export const Navbar = () => {
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'md' } as const);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenParticipantModal,
    onOpen: onOpenParticipantModal,
    onClose: onCloseParticipantModal,
  } = useDisclosure();

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
        <Flex>
          <Button size={buttonSize} mr="12px" onClick={onOpen}>
            Zostań mentorem
          </Button>
          <RecruitmentModal modalText={forMentors} isOpen={isOpen} onClose={onClose} />
          <Button size={buttonSize} color="brand" onClick={onOpenParticipantModal}>
            Zapisz się na kurs
          </Button>
          <RecruitmentModal
            isOpen={isOpenParticipantModal}
            onClose={onCloseParticipantModal}
            modalText={forParticipant}
          />
        </Flex>
      </HStack>
    </Center>
  );
};
