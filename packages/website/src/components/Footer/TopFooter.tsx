/* eslint-disable no-irregular-whitespace */
import React, { Fragment, ReactElement } from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { IconButton } from '@coderscamp/ui/components/IconButton';
import { HStack, Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { LiveChatLogoHorizontal } from '@coderscamp/ui/svg/logos';
import { CodersCrewLogo } from '@coderscamp/ui/svg/logos/CodersCrewLogo';

import { ExternalLink } from '../ExternalLink';
import { InternalLink } from '../InternalLink';
import { codersCrewSocials, footerNav, liveChatSocials, Social } from './Footer.data';

interface OrganizerWrapperProps {
  children: ReactElement[];
  socials: Social[];
}

const OrganizerWrapper = ({ children, socials }: OrganizerWrapperProps) => {
  const size = useBreakpointValue({ base: 'md', xl: 'sm', '2xl': 'md' } as const, 'base');

  return (
    <Flex
      maxW={{ lg: '440px', xl: '264px', '2xl': '292px' }}
      direction="column"
      align={{ base: 'center', lg: 'flex-start' }}
    >
      {children}
      <HStack pt="24px" mt="auto" spacing="16px" position="relative" left="-4px">
        {socials.map(({ label, icon, href }) => (
          <IconButton icon={icon} size={size} variant="ghost" aria-label={label} href={href} as="a" key={label} />
        ))}
      </HStack>
    </Flex>
  );
};

const CodersCrewDescription = () => (
  <OrganizerWrapper socials={codersCrewSocials}>
    <ExternalLink href="https://coderscrew.pl" rel="dofollow">
      <CodersCrewLogo maxW="100%" h="32px" />
    </ExternalLink>
    <Typography pt="20px" size={{ base: 'md', xl: 'sm', '2xl': 'md' }} textAlign={{ base: 'center', lg: 'left' }}>
      Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non‑profit zrzeszająca pasjonatów dziedzin
      związanych z IT.
    </Typography>
  </OrganizerWrapper>
);

const LiveChatDescription = () => (
  <OrganizerWrapper socials={liveChatSocials}>
    <ExternalLink href="https://www.livechat.com/careers" rel="dofollow">
      <LiveChatLogoHorizontal maxW="100%" h="40px" />
    </ExternalLink>
    <Typography pt="12px" size={{ base: 'md', xl: 'sm', '2xl': 'md' }} textAlign={{ base: 'center', lg: 'left' }}>
      Partnerem strategicznym CodersCamp jest LiveChat - producent oraz globalny dostawca rozwiązań służących do
      komunikacji online dla biznesu.
    </Typography>
  </OrganizerWrapper>
);

const FooterNav = () => (
  <Stack
    direction={{ base: 'column', sm: 'row' }}
    spacing={{ base: '40px', md: '80px', xl: '40px', '2xl': '80px' }}
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
            <Typography size={{ base: 'md', xl: 'sm', '2xl': 'md' }} color="gray.500" key={linkProps.href}>
              <LinkComponent withUnderline={false} {...linkProps} />
            </Typography>
          );
        })}
      </VStack>
    ))}
  </Stack>
);

export const TopFooter = () => {
  const wrapperComponent = useBreakpointValue({ base: 'div', xl: Fragment } as const, 'base');

  return (
    <Flex
      w="100%"
      direction={{ base: 'column', xl: 'row' }}
      align={{ base: 'center', xl: 'stretch' }}
      justify="space-between"
    >
      <Stack
        as={wrapperComponent}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '64px', md: '48px', lg: '32px' }}
        mb="80px"
        maxW="100%"
      >
        <CodersCrewDescription />
        <LiveChatDescription />
      </Stack>
      <FooterNav />
    </Flex>
  );
};
