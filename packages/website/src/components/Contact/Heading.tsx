import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidFacebookIcon, SolidMailIcon } from '@coderscamp/ui/icons';

import { CONTACT_EMAIL } from '@/constants';

import { ContactLink } from './ContactLink';

const CODERSCREW_FB_URL = 'facebook.com/ccrew18';

export const Heading = () => {
  const stackDirection = useBreakpointValue({ base: 'column', sm: 'row' } as const);

  const mailLinkHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Pytanie o CodersCamp')}`;
  const facebookHref = `https://www.${CODERSCREW_FB_URL}`;

  return (
    <Flex direction="column" align="center">
      <Typography
        mb={{ base: '16px', sm: '24px' }}
        size={{ base: '4xl', sm: '6xl' }}
        color="gray.900"
        weight="extrabold"
        textAlign="center"
      >
        Skontaktuj się z nami
      </Typography>
      <Typography size={{ base: 'md', sm: 'lg' }} color="gray.700" textAlign="center" mb="32px">
        Masz pytania odnośnie kolejnej edycji CodersCamp? Zastanawiasz się, czy zostanie mentorem to coś dla Ciebie?
        Chciałbyś z nami współpracować, aby uczynić kurs jeszcze lepszym? Masz jakiekolwiek inne pytanie, którego
        jeszcze nie zaadresowaliśmy na stronie? Odezwij się do nas korzystając z podanych poniżej danych kontaktowych
        lub formularza.
      </Typography>
      <Stack direction={stackDirection} spacing={{ base: '32px', sm: '40px' }} justify="center">
        <ContactLink href={mailLinkHref} icon={<SolidMailIcon color="#FBBF24" />}>
          {CONTACT_EMAIL}
        </ContactLink>
        <ContactLink href={facebookHref} icon={<SolidFacebookIcon color="#4064AC" />}>
          {CODERSCREW_FB_URL}
        </ContactLink>
      </Stack>
    </Flex>
  );
};
