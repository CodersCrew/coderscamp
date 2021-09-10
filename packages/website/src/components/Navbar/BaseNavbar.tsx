import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pageNavigation } from 'src/pageNavigation';

import { Button } from '@coderscamp/ui/components/Button';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@coderscamp/ui/components/Drawer';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { HStack, VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';
import { SolidMenuIcon } from '@coderscamp/ui/icons/SolidMenu';
import { LogoBlackHorizontal } from '@coderscamp/ui/svg/logos';

import { MENTOR_RECRUITMENT_FORM_URL } from '@/constants';

import { externalLinkBaseProps } from '../ExternalLink';
import { useRecruitmentModal } from '../RecruitmentModal';
import { NavbarItem } from './NavbarItem';

const BecomePartOfCourseButtons = () => {
  const { openModal } = useRecruitmentModal();

  return (
    <>
      <Button size="md" color="brand" as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
        Zostań mentorem
      </Button>
      <Button size="md" onClick={() => openModal('participant')}>
        Zapisz się na kurs
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
  const drawerSize = useBreakpointValue({ base: 'xs', sm: 'md', md: 'lg' } as const);

  return (
    <Flex>
      {!isSmallerThan560px && (
        <HStack spacing="12px" pr="24px">
          <BecomePartOfCourseButtons />
        </HStack>
      )}
      <IconButton aria-label="Nawigacja" icon={<SolidMenuIcon />} size="md" bg="transparent" onClick={onOpen} />
      <Drawer
        placement="left"
        size={drawerSize}
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
        returnFocusOnClose={false}
      >
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
                <BecomePartOfCourseButtons />
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
        {pageNavigation.map((element) => (
          <NavbarItem key={element.children} text={element.children} href={element.href} />
        ))}
      </Flex>
      <HStack spacing="12px" pr="24px">
        <BecomePartOfCourseButtons />
      </HStack>
    </>
  );
};
