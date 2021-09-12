import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { listOfPartners, PartnerType } from '@/components/Partners/Partners.data';
import { PartnersList } from '@/components/Partners/PartnersList';
import { Section } from '@/components/Section';

export const Partners = () => {
  return (
    <Section spacing="64px">
      <Typography size="4xl" weight="extrabold">
        Zaufali nam
      </Typography>
      <VStack flexDir="column" w="100%" spacing="40px">
        {listOfPartners?.map(({ title, listOfPartnersImg }: PartnerType) => (
          <PartnersList key={title} title={title} listOfPartnersImg={listOfPartnersImg} />
        ))}
      </VStack>
    </Section>
  );
};
