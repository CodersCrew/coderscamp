import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@coderscamp/ui/components/Button';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@coderscamp/ui/components/Drawer';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';
import { SolidMenuIcon } from '@coderscamp/ui/icons/SolidMenu';
import { LogoBlackHorizontal } from '@coderscamp/ui/svg/logos';

import { MENTOR_RECRUITMENT_FORM_URL, pageNavigation } from '@/constants';

import { externalLinkBaseProps } from '../ExternalLink';
import { useRecruitmentModal } from '../RecruitmentModal';
import { NavbarItem } from './NavbarItem';

const NavbarButtons = () => {
  const { openModal } = useRecruitmentModal();

  return (
    <>
      <Button size="md" color="brand" onClick={() => openModal('participant')}>
        Zapisz się na kurs
      </Button>
      <Button size="md" as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
        Zostań mentorem
      </Button>
    </>
  );
};
const baseLogoProps = { cursor: 'pointer', maxWidth: '280px', maxHeight: '40px' };

export const MobileBaseNavbar = () => {
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'medium');
  const [isSmallerThan560px] = useMediaQuery('(max-width: 560px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      {!isSmallerThan560px && (
        <HStack spacing="12px" pr="24px">
          <NavbarButtons />
        </HStack>
      )}
      <IconButton aria-label="Nawigacja" icon={<SolidMenuIcon />} size="md" bg="transparent" onClick={onOpen} />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} autoFocus={false} returnFocusOnClose={false}>
        <DrawerOverlay />
        <DrawerContent boxShadow="large">
          <DrawerHeader pt="31px" px="16px" pb={0}>
            <LogoBlackHorizontal {...baseLogoProps} />
          </DrawerHeader>
          <DrawerBody p="41px 0 0 0 ">
            <VStack spacing="10px" alignItems="flex-start">
              {pageNavigation.map((element) => (
                <Link key={element.children} href={element.href}>
                  <Button
                    width="100%"
                    variant="ghost"
                    justifyContent="start"
                    fontWeight={fontWeight(element.href)}
                    onClick={() => onClose()}
                    borderRadius="none"
                  >
                    {element.children}
                  </Button>
                </Link>
              ))}
            </VStack>
            {isSmallerThan560px && (
              <VStack mt="26px" px="16px" spacing="16px" width="100%" alignItems="stretch">
                <NavbarButtons />
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
      <Flex ml={{ base: 0, lg: 'auto', xl: 0 }}>
        {pageNavigation.map((element) => (
          <NavbarItem key={element.children} text={element.children} href={element.href} />
        ))}
      </Flex>
      <HStack spacing="12px">
        <NavbarButtons />
      </HStack>
    </>
  );
};
