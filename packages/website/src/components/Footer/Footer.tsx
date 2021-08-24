import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Logo } from '@coderscamp/ui/components/Logo';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { socialMediaIcons } from './Footer.data';

export const Footer = () => {
  const footerStyles = {
    upperFooter: {
      direction: useBreakpointValue({ base: 'column', lg: 'row' } as const),
    } as const,
    lowerFooter: {
      direction: useBreakpointValue({ base: 'column', md: 'row' } as const),
      order: useBreakpointValue({ base: -1, md: 1 } as const),
    } as const,
  } as const;

  return (
    <Flex w="100%" direction="column" align="center" bg="gray.50" color="gray.500">
      <Flex maxW="1280px" w="80%" direction="column" pt="80px" pb="80px">
        <Flex w="100%" direction={footerStyles.upperFooter.direction} align="center" justify="space-between">
          <Box maxW="384px" direction="column" pb="88px">
            <Logo color="black" w="291px" h="32px" />

            <Typography w="100%" pt="20px" size="md">
              Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
              dziedzin związanych z IT.
            </Typography>

            <Flex pt="32px">
              {socialMediaIcons.map((socialMediaIcon, index) => (
                <Box key={socialMediaIcon.name}>
                  {React.cloneElement(socialMediaIcon.component, {
                    h: '24px',
                    w: '24px',
                    ml: index === 0 ? 0 : '28px',
                  })}
                </Box>
              ))}
            </Flex>
          </Box>

          <Flex maxW="560px" className="footer__nav footerNav" pb="88px">
            <div className=" footerNav__container">
              <div className="footerNav__nav">
                <header className="footerNav__title"> title</header>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
              </div>
              <div className="footerNav__toDownload">
                <header className="footerNav__title"> title</header>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
              </div>
              <div className="footerNav__legalIssues">
                <header className="footerNav__title"> title</header>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
                <span className="footerNav__item"> item </span>
              </div>
            </div>
          </Flex>
        </Flex>

        <Flex
          justify="space-between"
          borderTop="1px"
          borderColor="gray.200"
          minH="70px"
          align="flex-end"
          direction={footerStyles.lowerFooter.direction}
        >
          <Typography size="lg" color="gray.400" pt="24px">
            © CodersCamp 2021, wszelkie prawa zastrzeżone.
          </Typography>
          <Box pt="24px" order={footerStyles.lowerFooter.order}>
            PRZYCISK
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
