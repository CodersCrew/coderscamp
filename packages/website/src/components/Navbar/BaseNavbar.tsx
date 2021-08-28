import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Logo } from '@coderscamp/ui/components/Logo';
import { VStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidCloseIcon, SolidMenuIcon } from '@coderscamp/ui/icons';

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

export const DesktopBaseNavbar = () => {
  const logoLayout = useBreakpointValue({ base: 'square', xl: 'horizontal' } as const);

  return (
    <>
      {logoLayout && <Logo maxWidth="280px" color="black" layout={logoLayout} />}
      <Flex>
        {NavbarElements.map((element) => (
          <NavbarItem key={element.text} text={element.text} href={element.destinationLink} />
        ))}
      </Flex>
    </>
  );
};

export const MobileBaseNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const logoLayout = useBreakpointValue({ sm: 'square', md: 'horizontal' } as const);
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'normal');

  const changeDisplayMobileMenu = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <Flex>
      <IconButton size="md" aria-label="Open Menu" icon={<SolidMenuIcon />} onClick={changeDisplayMobileMenu} />
      {isVisible && (
        <Flex
          w="100vw"
          h="100vh"
          position="fixed"
          top="0"
          left="0"
          zIndex={20}
          bgColor="white"
          flexDirection="column"
          overflow="hidden"
        >
          <Flex justifyContent="flex-end">
            <IconButton
              mt="18px"
              mr="8px"
              aria-label="Close Menu"
              size="md"
              icon={<SolidCloseIcon />}
              onClick={changeDisplayMobileMenu}
            />
          </Flex>

          <VStack h="100%" justifyContent="space-evenly">
            {NavbarElements.map((element) => (
              <Link key={element.text} href={element.destinationLink}>
                <Box
                  as="p"
                  fontWeight={fontWeight(element.destinationLink)}
                  fontSize="3xl"
                  onClick={changeDisplayMobileMenu}
                >
                  {element.text}
                </Box>
              </Link>
            ))}
          </VStack>
        </Flex>
      )}
      {logoLayout && <Logo ml="6" maxWidth="280px" color="black" layout={logoLayout} />}
    </Flex>
  );
};
