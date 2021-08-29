import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { HStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import logoCodersCrew from '../../assets/footer/CodersCrewLogo.svg';
import logoVercel from '../../assets/footer/VercelLogo.svg';
import { ExternalLink } from '../ExternalLink';
import { InternalLink } from '../InternalLink';
import { footerNav, socialMediaIcons } from './Footer.data';

const FooterNav = () => (
  <Flex wrap="wrap">
    {footerNav.map(({ title, items }) => (
      <Flex direction="column" key={title} pl="80px" mb="16px">
        <Typography size="sm" color="gray.400" weight="bold" textTransform="uppercase" mb="16px">
          {title}
        </Typography>
        {items.map(({ isExternal, ...linkProps }) => {
          const LinkComponent = isExternal ? ExternalLink : InternalLink;

          return (
            <Typography size="md" color="gray.500" key={linkProps.href} mb="16px">
              <LinkComponent withUnderline={false} {...linkProps} />
            </Typography>
          );
        })}
      </Flex>
    ))}
  </Flex>
);

const TopFooter = () => {
  const direction = useBreakpointValue({ base: 'column', xl: 'row' } as const);

  return (
    <Flex w="100%" direction={direction} align="flex-start" justify="space-between" mb={[0, 0, 0, 0, '32px']}>
      <Box maxW="384px" direction="column" mb="56px">
        <Box position="relative" display="block" w="291px" h="32px">
          <Image alt="Logo CodersCrew" src={logoCodersCrew} layout="fill" />
        </Box>
        <Typography w="100%" pt="20px" size="md">
          Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
          dziedzin związanych z IT.
        </Typography>
        <HStack pt="32px" spacing="24px">
          {socialMediaIcons.map(({ label, icon, href }) => (
            <IconButton icon={icon} size="md" variant="link" aria-label={label} href={href} as="a" key={label} />
          ))}
        </HStack>
      </Box>
      <Flex mb="56px" ml={{ base: '-80px', xl: '0' }}>
        <FooterNav />
      </Flex>
    </Flex>
  );
};

const BottomFooter = () => {
  const direction = useBreakpointValue({ base: 'column', md: 'row' } as const);
  const vercelLogoOrder = useBreakpointValue({ base: -1, md: 1 } as const);

  return (
    <Flex borderTop="1px" borderColor="gray.200" minH="70px" align="flex-end">
      <Flex justify="space-between" align="center" direction={direction} width="100%">
        <Typography size="lg" color="gray.400" pt="24px">
          © CodersCamp 2021, wszelkie prawa zastrzeżone.
        </Typography>
        <Box order={vercelLogoOrder} position="relative" display="block" w="212px" h="44px" mt="24px">
          <Link href="https://vercel.com/?utm_source=coderscamp&utm_campaign=oss">
            <Image layout="fill" alt="Logo Vercel" src={logoVercel} />
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Footer = () => {
  return (
    <Flex w="100%" direction="column" align="center" bg="gray.50" color="gray.500">
      <Flex maxW="1280px" w="80%" direction="column" mt="80px" mb="80px">
        <TopFooter />
        <BottomFooter />
      </Flex>
    </Flex>
  );
};
