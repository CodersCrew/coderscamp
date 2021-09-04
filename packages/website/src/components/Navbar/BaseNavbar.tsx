import Link from 'next/link';
import { useRouter } from 'next/router';

import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { Logo } from '@coderscamp/ui/components/Logo';
import { Menu as ChakraMenu, MenuButton, MenuItem, MenuList } from '@coderscamp/ui/components/Menu';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidMenuIcon } from '@coderscamp/ui/icons/SolidMenu';

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
  const logoLayout = useBreakpointValue({ sm: 'square', md: 'horizontal' } as const);
  const { route } = useRouter();
  const fontWeight = (link: string) => (link === route ? 'bold' : 'normal');

  return (
    <Flex alignItems="center">
      <ChakraMenu>
        <MenuButton as={IconButton} aria-label="Options" icon={<SolidMenuIcon />} />
        <MenuList>
          {NavbarElements.map((element) => (
            <Link key={element.text} href={element.destinationLink}>
              <MenuItem fontWeight={fontWeight(element.destinationLink)}>{element.text}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </ChakraMenu>
      {logoLayout && <Logo ml="6" maxWidth="280px" color="black" layout={logoLayout} />}
    </Flex>
  );
};

export const DesktopBaseNavbar = () => {
  const logoLayout = useBreakpointValue({ base: 'square', xl: 'horizontal' } as const);

  return (
    <>
      {logoLayout && (
        <Link href="/">
          <Logo maxWidth="280px" color="black" layout={logoLayout} style={{ cursor: 'pointer' }} />
        </Link>
      )}
      <Flex>
        {NavbarElements.map((element) => (
          <NavbarItem key={element.text} text={element.text} href={element.destinationLink} />
        ))}
      </Flex>
    </>
  );
};
