import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Menu as ChakraMenu, MenuButton, MenuItem, MenuList } from '@coderscamp/ui/components/Menu';
import { VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
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
  const logoLayout = useBreakpointValue({ sm: 'square', md: 'horizontal' } as const);
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'normal');
  const [isSmallerThan560px] = useMediaQuery('(max-width: 560px)');
  const logoProps = { ...baseLogoProps, ml: '24px' };
  const { openModal } = useRecruitmentModal();

  return (
    <Flex alignItems="center" order={2}>
      <ChakraMenu>
        <MenuButton as={IconButton} aria-label="Options" icon={<SolidMenuIcon />} size="md" bg="transparent" />

        <MenuList>
          <Link href="/">
            {logoLayout === 'horizontal' ? <LogoBlackHorizontal {...logoProps} /> : <LogoBlackSquare {...logoProps} />}
          </Link>
          {NavbarElements.map((element) => (
            <Link key={element.text} href={element.destinationLink}>
              <MenuItem fontWeight={fontWeight(element.destinationLink)}>{element.text}</MenuItem>
            </Link>
          ))}
          {isSmallerThan560px && (
            <VStack spacing="12px">
              <Button size="md" color="brand" as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
                Zostań mentorem
              </Button>
              <Button size="md" onClick={() => openModal('participant')}>
                Zapisz się na kurs
              </Button>
            </VStack>
          )}
        </MenuList>
      </ChakraMenu>
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
