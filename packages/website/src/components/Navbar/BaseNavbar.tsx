import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@coderscamp/ui/components/Button';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@coderscamp/ui/components/Drawer';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useDisclosure } from '@coderscamp/ui/hooks/useDisclosure';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';
import { SolidMenuIcon } from '@coderscamp/ui/icons/SolidMenu';
import { LogoBlackHorizontal, LogoBlackSquare } from '@coderscamp/ui/svg/logos';

import { MENTOR_RECRUITMENT_FORM_URL } from '@/constants';

import { externalLinkBaseProps } from '../ExternalLink';
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

const baseLogoProps = { cursor: 'pointer', width: '100%', maxWidth: '280px', height: '100%', maxHeight: '40px' };

export const MobileBaseNavbar = () => {
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'medium');
  const [isSmallerThan560px] = useMediaQuery('(max-width: 560px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal } = useRecruitmentModal();
  const drawerSize = useBreakpointValue({ base: 'xs', sm: 'md', md: 'lg' } as const);

  return (
    <Flex order={2}>
      <IconButton aria-label="Nawigacja" icon={<SolidMenuIcon />} size="md" bg="transparent" onClick={onOpen} />
      <Drawer placement="left" size={drawerSize} onClose={onClose} isOpen={isOpen} autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent boxShadow="large">
          <DrawerHeader pt="31px" px="16px" pb={0}>
            <LogoBlackHorizontal {...baseLogoProps} />
          </DrawerHeader>
          <DrawerBody p="41px 0 0 0 ">
            <VStack spacing="10px" alignItems="flex-start">
              {NavbarElements.map((element) => (
                <Link key={element.text} href={element.destinationLink}>
                  <Button
                    width="100%"
                    variant="ghost"
                    justifyContent="start"
                    fontWeight={fontWeight(element.destinationLink)}
                    onClick={() => onClose()}
                    borderRadius="none"
                  >
                    {element.text}
                  </Button>
                </Link>
              ))}
            </VStack>
            {isSmallerThan560px && (
              <VStack mt="26px" px="16px" spacing="16px" width="100%" alignItems="stretch">
                <Button size="md" color="brand" onClick={() => openModal('participant')}>
                  Zapisz się na kurs
                </Button>
                <Button size="md" as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
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
  const logoLayout = useBreakpointValue({ base: 'square', xl: 'horizontal' } as const);

  return (
    <>
      <Link href="/">
        {logoLayout === 'horizontal' ? (
          <LogoBlackHorizontal {...baseLogoProps} />
        ) : (
          <LogoBlackSquare {...baseLogoProps} />
        )}
      </Link>
      <Flex>
        {NavbarElements.map((element) => (
          <NavbarItem key={element.text} text={element.text} href={element.destinationLink} />
        ))}
      </Flex>
    </>
  );
};
