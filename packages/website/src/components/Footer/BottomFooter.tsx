import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { VercelLogo } from '@coderscamp/ui/svg/logos/VercelLogo';

import { ExternalLink } from '../ExternalLink';

export const BottomFooter = () => {
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
