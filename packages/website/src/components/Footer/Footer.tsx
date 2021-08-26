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
import { footerNav, socialMediaIcons } from './Footer.data';

export const Footer = () => {
  const footerStyles = {
    upperFooter: {
      direction: useBreakpointValue({ base: 'column', xl: 'row' } as const),
    } as const,
    lowerFooter: {
      direction: useBreakpointValue({ base: 'column', md: 'row' } as const),
      order: useBreakpointValue({ base: -1, md: 1 } as const),
    } as const,
    navSection: {
      marginLeft: useBreakpointValue({ base: '-80px', xl: '0' } as const),
    } as const,
  } as const;

  return (
    <Flex w="100%" direction="column" align="center" bg="gray.50" color="gray.500">
      <Flex maxW="1280px" w="80%" direction="column" mt="80px" mb="80px">
        <Flex
          w="100%"
          direction={footerStyles.upperFooter.direction}
          align="flex-start"
          justify="space-between"
          mb={[0, 0, 0, 0, '32px']}
        >
          <Box maxW="384px" direction="column" mb="56px">
            <Box position="relative" display="block" w="291px" h="32px">
              <Image alt="Logo CodersCrew" src={logoCodersCrew} layout="fill" />
            </Box>

            <Typography w="100%" pt="20px" size="md">
              Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
              dziedzin związanych z IT.
            </Typography>

            <HStack pt="32px" spacing="24px">
              {socialMediaIcons.map((socialMediaIcon) => (
                <IconButton
                  icon={socialMediaIcon.component}
                  size="md"
                  variant="link"
                  aria-label={socialMediaIcon.name}
                  href={socialMediaIcon.urlPath}
                  as="a"
                  key={socialMediaIcon.name}
                />
              ))}
            </HStack>
          </Box>

          <Flex mb="56px" ml={footerStyles.navSection.marginLeft}>
            <Flex wrap="wrap">
              {footerNav.map(({ title, items }) => (
                <Flex direction="column" key={title} pl="80px" mb="16px">
                  <Typography size="sm" color="gray.400" weight="bold" letterSpacing="0.05em" mb="16px">
                    {title.toUpperCase()}
                  </Typography>
                  {items.map(({ name, urlPath }) => (
                    <Typography size="md" color="gray.500" key={name} mb="16px">
                      <Link href={urlPath}>{name}</Link>
                    </Typography>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <Flex borderTop="1px" borderColor="gray.200" minH="70px" align="flex-end">
          <Flex justify="space-between" align="center" direction={footerStyles.lowerFooter.direction} width="100%">
            <Typography size="lg" color="gray.400" pt="24px">
              © CodersCamp 2021, wszelkie prawa zastrzeżone.
            </Typography>
            <Box
              order={footerStyles.lowerFooter.order}
              position="relative"
              display="block"
              w="212px"
              h="44px"
              mt="24px"
            >
              <Link href="https://vercel.com/?utm_source=coderscamp&utm_campaign=oss">
                <Image layout="fill" alt="Logo Vercel" src={logoVercel} />
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
