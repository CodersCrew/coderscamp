import React from 'react';

import { Box } from '@coderscamp/ui/components/Box';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Logo } from '@coderscamp/ui/components/Logo';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import {
  SolidFacebookIcon,
  SolidGitHubIcon,
  SolidGlobalIcon,
  SolidInstagramIcon,
  SolidLinkedinIcon,
} from '@coderscamp/ui/icons';
import { colors } from '@coderscamp/ui/theme/overwrites/foundations/colors';

export const socialMediaIcons = [
  { name: 'FacebookIcon', component: <SolidFacebookIcon /> },
  { name: 'LinkedinIcon', component: <SolidLinkedinIcon /> },
  { name: 'InstagramIcon', component: <SolidInstagramIcon /> },
  { name: 'GitHubIcon', component: <SolidGitHubIcon /> },
  { name: 'GlobalIcon', component: <SolidGlobalIcon /> },
];

export const Footer = () => {
  const footerStyles = {
    upperFooter: {
      direction: useBreakpointValue({ base: 'column', lg: 'row' } as const),
      // align: useBreakpointValue({ base: 'center', lg: 'space-between' } as const),
    } as const,
  } as const;

  return (
    <Flex w="100%" direction="column" align="center" bg={colors.gray['50']} color={colors.gray['500']}>
      <Flex maxW="1280px" w="80%" direction="column" pt="80px" pb="80px">
        <Flex w="100%" direction={footerStyles.upperFooter.direction} align="center" justify="space-between">
          <Box maxW="384px" direction="column" pb="88px">
            <Logo color="black" w="291px" h="32px" />

            <Box w="100%" pt={5}>
              Organizatorem CodersCamp jest Stowarzyszenie CodersCrew - organizacja non-profit zrzeszająca pasjonatów
              dziedzin związanych z IT.
            </Box>

            <Flex pt={8}>
              {socialMediaIcons.map((socialMediaIcon, index) => (
                <Box key={socialMediaIcon.name}>
                  {React.cloneElement(socialMediaIcon.component, { h: 6, w: 6, ml: index === 0 ? 0 : 7 })}
                </Box>
              ))}
            </Flex>
          </Box>

          <Flex maxW="560px" className="footer__nav footerNav">
            <div className=" footerNav__container">
              <div className="footerNav__nav">
                <header className="footerNav__title"> title</header>
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

        <Flex className="footer__bottomSection">
          <div className=" footerBottomSection__container">
            <p className="footerBottomSection__copyright">© CodersCamp 2021, wszelkie prawa zastrzeżone.</p>
            <div className="footerBottomSection__vercelLogo" />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};
