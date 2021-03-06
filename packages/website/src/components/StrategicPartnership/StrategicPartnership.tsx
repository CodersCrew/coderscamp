import { Center } from '@coderscamp/ui/components/Center';
import { Grid } from '@coderscamp/ui/components/Grid';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { LiveChatLogoHorizontalWhite } from '@coderscamp/ui/svg/logos';

import { STRATEGIC_PARTNER_SECTION_ID } from '@/constants';

import { ExternalLink } from '../ExternalLink';
import { Section } from '../Section';
import { StrategicPartnershipBenefit, strategicPartnershipBenefits } from './StrategicPartnership.data';

const Benefit = ({ icon, title, content }: StrategicPartnershipBenefit) => (
  <VStack spacing="16px" align="center">
    <Center p="12px" bg="rgba(255,255,255,0.1)" borderRadius="6px" fontSize="32px">
      {icon}
    </Center>
    <VStack spacing="4px">
      <Typography size="lg" weight="medium">
        {title}
      </Typography>
      <Typography size="md" weight="normal" color="gray.200">
        {content}
      </Typography>
    </VStack>
  </VStack>
);

export const StrategicPartnership = () => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);

  return (
    <Section spacing="32px" color="white" bg="#1B1B20" textAlign="center" id={STRATEGIC_PARTNER_SECTION_ID}>
      <Typography size="4xl" weight="extrabold">
        Jeszcze lepszy CodersCamp
      </Typography>
      <VStack spacing="64px">
        <VStack spacing="24px">
          <Typography size="xl" weight="medium">
            Partnerem strategicznym CodersCamp 2021 jest
          </Typography>
          <ExternalLink href="https://www.livechat.com/careers" rel="dofollow">
            <LiveChatLogoHorizontalWhite height="80px" />
          </ExternalLink>
          <Typography size={{ base: 'md', md: 'lg' }} weight="normal">
            Podczas tej edycji kursu możesz liczyć na wiele niespodzianek, wyzwań oraz możliwości poszerzania swojej
            wiedzy i wykorzystywania jej w praktyce. Poniżej znajdziesz kilka przykładów:
          </Typography>
        </VStack>
        <Grid templateColumns={`repeat(${columnsCount}, 1fr)`} gap="64px 40px">
          {strategicPartnershipBenefits.map((benefit) => (
            <Benefit key={benefit.title} {...benefit} />
          ))}
        </Grid>
      </VStack>
    </Section>
  );
};
