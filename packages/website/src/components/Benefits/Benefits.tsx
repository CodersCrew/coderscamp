import { BenefitCard } from '@coderscamp/ui/components/BenefitCard';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { SolidArrowDownIcon } from '@coderscamp/ui/icons';

import { benefitItems } from './BenefitItems';

export const Benefits = () => {
  return (
    <Center justify="center" pt="40px" pb="80px" textAlign="center" flexDirection="column" px="12px">
      <VStack maxWidth="1280px">
        <Typography size="4xl" weight="extrabold">
          Co wyróżnia CodersCamp?
        </Typography>
        <Center pt="60px" pb="12px" flexWrap="wrap" justifyContent={{ base: 'space-around', xl: 'space-between' }}>
          {benefitItems.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              {...benefit}
              width={{ base: 'min(100%, 400px)', md: '320px', lg: '400px' }}
              backgroundColor="gray.200"
              my="32px"
              mx="4px"
              pb="6px"
            />
          ))}
        </Center>
        <Button size="lg" color="brand" icon={<SolidArrowDownIcon />}>
          Rozwiń listę zalet
        </Button>
      </VStack>
    </Center>
  );
};
