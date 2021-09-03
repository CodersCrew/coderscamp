import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@coderscamp/ui/components/Button';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@coderscamp/ui/components/Drawer';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Logo } from '@coderscamp/ui/components/Logo';
import { VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';
import { OutlinedMenuIcon } from '@coderscamp/ui/icons';

import { useRecruitmentModal } from '../RecruitmentModal';
import { NavbarItem } from './NavbarItem';

const NavbarElements = [
  {
    text: 'Strona główna',
    destinationLink: '/',
  },
  {
    text: 'Dla mentorów',
    destinationLink: '/mentor',
  },
  {
    text: 'FAQ',
    destinationLink: '/faq',
  },
  {
    text: 'Kontakt',
    destinationLink: '/kontakt',
  },
];

export const MobileBaseNavbar = () => {
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'normal');
  const [isSmallerThan560px] = useMediaQuery('(max-width: 560px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal } = useRecruitmentModal();
  const drawerSize = useBreakpointValue({ base: 'xs', sm: 'md', md: 'lg' } as const);

  return (
    <Flex order={2}>
      <IconButton aria-label="Nawigacja" icon={<OutlinedMenuIcon />} size="md" bg="transparent" onClick={onOpen} />
      <Drawer placement="left" size={drawerSize} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent px="16px" boxShadow="large">
          <DrawerHeader pt="31px" pb="41px" px={0}>
            <Logo maxWidth="250px" color="black" layout="horizontal" />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing="20px" alignItems="flex-start">
              {NavbarElements.map((element) => (
                <Link key={element.text} href={element.destinationLink}>
                  <Button
                    width="100%"
                    variant="ghost"
                    justifyContent="start"
                    _focus={{ outline: 'none' }}
                    fontWeight={fontWeight(element.destinationLink)}
                    onClick={() => onClose()}
                  >
                    {element.text}
                  </Button>
                </Link>
              ))}
            </VStack>
            {isSmallerThan560px && (
              <VStack mt="26px" spacing="16px" width="100%" alignItems="stretch">
                <Button
                  size="md"
                  color="brand"
                  onClick={() => {
                    openModal('participant');
                    onClose();
                  }}
                >
                  Zapisz się na kurs
                </Button>
                <Button
                  size="md"
                  onClick={() => {
                    openModal('mentor');
                    onClose();
                  }}
                >
                  Zostań mentorem
                </Button>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export const DesktopBaseNavbar = () => {
  return (
    <>
      <Flex>
        {NavbarElements.map((element) => (
          <NavbarItem key={element.text} text={element.text} href={element.destinationLink} />
        ))}
      </Flex>
    </>
  );
};
