import { Button } from '@coderscamp/ui/components/Button';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Stack, VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { MENTOR_RECRUITMENT_FORM_URL, PARTICIPANT_RECRUITMENT_FORM_URL, PROJECTS_COUNT, TEAM_SIZE } from '@/constants';

import { externalLinkBaseProps } from './ExternalLink';

export const Hero = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg' } as const);
  const buttonsStackDirection = useBreakpointValue({ base: 'column', md: 'row' } as const);

  const mainHeaderSize = { base: '4xl', md: '6xl', '1xl': '7xl', '2xl': '8xl' } as const;
  const subheaderSize = { base: 'md', sm: 'xl', '1xl': '2xl' } as const;
  const buttonProps = { size: buttonSize, width: 'min(280px, 75vw)' } as const;

  return (
    <Flex
      justify="center"
      width="100%"
      p={{ base: '32px 0px 64px', xl: '60px 64px 160px' }}
      pt={{ base: '32px', xl: '60px', '1xl': '80px', '2xl': '120px' }}
    >
      <VStack spacing={{ base: '32px', '1xl': '40px', '2xl': '56px' }} maxW="min(1400px, 100%)">
        <VStack spacing={{ base: '16px', '1xl': '24px', '2xl': '32px' }} textAlign="center">
          <Typography size={mainHeaderSize} color="gray.900" weight="extrabold">
            Największy otwarty kurs programowania webowego w Polsce
          </Typography>
          <Typography size={subheaderSize} color="gray.500">
            Dołącz do {TEAM_SIZE}-osobowego zespołu • Rozwijaj się dzięki wsparciu doświadczonego mentora • Poznaj od
            podstaw programowanie webowe • Stwórz aż {PROJECTS_COUNT} praktycznych projektów • Rozpocznij swoją karierę
            jako web developer
          </Typography>
        </VStack>
        <Stack spacing={{ base: '12px', sm: '24px' }} direction={buttonsStackDirection}>
          <Button
            {...buttonProps}
            color="brand"
            as="a"
            href={PARTICIPANT_RECRUITMENT_FORM_URL}
            {...externalLinkBaseProps}
          >
            Zapisz się na kurs
          </Button>
          <Button {...buttonProps} as="a" href={MENTOR_RECRUITMENT_FORM_URL} {...externalLinkBaseProps}>
            Zostań mentorem
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
};
