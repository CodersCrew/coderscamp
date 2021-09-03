import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { HStack, Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { CodersCrewLogo } from '@coderscamp/ui/svg/logos/CodersCrewLogo';
import { VercelLogo } from '@coderscamp/ui/svg/logos/VercelLogo';

import { ExternalLink } from '../ExternalLink';
import { InternalLink } from '../InternalLink';
import { Section } from '../Section';
import { footerNav, socialMediaIcons } from './Footer.data';

const FooterNav = () => (
  <Stack
    direction={{ base: 'column', sm: 'row' }}
    spacing={{ base: '40px', md: '80px', lg: '40px', xl: '80px' }}
    align={{ base: 'center', sm: 'flex-start' }}
  >
    {footerNav.map(({ title, items }) => (
      <VStack
        align={{ base: 'center', sm: 'flex-start' }}
        key={title}
        spacing="16px"
        textAlign={{ base: 'center', sm: 'left' }}
      >
        <Typography size="sm" color="gray.400" weight="bold" textTransform="uppercase">
          {title}
        </Typography>
        {items.map(({ isExternal, ...linkProps }) => {
          const LinkComponent = isExternal ? ExternalLink : InternalLink;

          return (
            <Typography size="md" color="gray.500" key={linkProps.href}>
              <LinkComponent withUnderline={false} {...linkProps} />
            </Typography>
          );
        })}
      </VStack>
    ))}
  </Stack>
);

const TopFooter = () => {
  return (
    <Flex
      w="100%"
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'flex-start' }}
      justify="space-between"
    >
      <Flex maxW="384px" direction="column" align={{ base: 'center', lg: 'flex-start' }} mb={{ base: '64px', lg: 0 }}>
        <ExternalLink href="https://coderscrew.pl">
          <CodersCrewLogo h="32px" />
        </ExternalLink>
        <Typography pt="20px" size="md" textAlign={{ base: 'center', lg: 'left' }}>
          Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
          dziedzin związanych z IT.
        </Typography>
        <HStack pt="24px" spacing="16px">
          {socialMediaIcons.map(({ label, icon, href }) => (
            <IconButton icon={icon} size="md" variant="ghost" aria-label={label} href={href} as="a" key={label} />
          ))}
        </HStack>
      </Flex>
      <FooterNav />
    </Flex>
  );
};

const BottomFooter = () => {
  const direction = useBreakpointValue({ base: 'column-reverse', md: 'row' } as const);

  return (
    <Flex borderTop="1px" borderColor="gray.200" minH="70px" align="flex-end" width="100%">
      <Stack
        justify="space-between"
        align="center"
        direction={direction}
        width="100%"
        mt={{ base: '32px', md: '24px' }}
        spacing={{ base: '16px', md: '24px' }}
      >
        <Typography color="gray.400" textAlign={{ base: 'center', md: 'left' }}>
          © CodersCamp 2021, wszelkie prawa zastrzeżone.
        </Typography>
        <ExternalLink href="https://vercel.com/?utm_source=coderscamp&utm_campaign=oss">
          <VercelLogo w="212px" h="44px" />
        </ExternalLink>
      </Stack>
    </Flex>
  );
};

export const Footer = () => {
  return (
    <Section bg="gray.50" spacing={{ base: '40px', lg: '80px' }} color="gray.500">
      <TopFooter />
      <BottomFooter />
    </Section>
  );
};
