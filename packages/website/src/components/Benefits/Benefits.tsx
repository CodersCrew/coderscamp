import { useRef, useState } from 'react';

import { BenefitCard, BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import { Button } from '@coderscamp/ui/components/Button';
import { Grid } from '@coderscamp/ui/components/Grid';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidArrowDownIcon } from '@coderscamp/ui/icons/SolidArrowDown';
import { SolidArrowUpIcon } from '@coderscamp/ui/icons/SolidArrowUp';

import { Section } from '../Section';

export interface BenefitsProps {
  title: string;
  benefitItems: BenefitCardProps[];
  shrinkSize?: number;
}

const expandedProfitButton = {
  icon: <SolidArrowUpIcon />,
  text: 'Zwiń listę zalet CodersCamp',
} as const;

const rolledUpProfitButton = {
  icon: <SolidArrowDownIcon />,
  text: 'Rozwiń listę zalet CodersCamp',
} as const;

export const Benefits = ({ title, benefitItems, shrinkSize }: BenefitsProps) => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);
  const profitButtonSize = useBreakpointValue({ base: 'sm', md: 'lg' } as const);

  const [isExpanded, setIsExpanded] = useState(false);
  const benefitTitleRef = useRef<HTMLDivElement>(null);

  const profitButtonValues = isExpanded ? expandedProfitButton : rolledUpProfitButton;

  const handleExpandButtonClick = () => {
    setIsExpanded((prev) => !prev);

    if (isExpanded) benefitTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const showExpandProfitButton = shrinkSize !== undefined && benefitItems.length > shrinkSize;
  const displayedBenefitItems =
    showExpandProfitButton && !isExpanded ? benefitItems.slice(0, shrinkSize) : benefitItems;

  return (
    <Section spacing={{ base: '80px', lg: '96px' }}>
      <Typography
        ref={benefitTitleRef}
        size={{ base: '3xl', lg: '4xl' }}
        color="gray.900"
        weight="extrabold"
        textAlign="center"
      >
        {title}
      </Typography>
      <VStack spacing="48px">
        <Grid templateColumns={`repeat(${columnsCount}, 1fr)`} gap="64px 40px">
          {displayedBenefitItems.map((item) => (
            <BenefitCard key={item.title} {...item} />
          ))}
        </Grid>
        {showExpandProfitButton && (
          <Button
            icon={profitButtonValues.icon}
            size={profitButtonSize}
            color="brand"
            onClick={handleExpandButtonClick}
          >
            {profitButtonValues.text}
          </Button>
        )}
      </VStack>
    </Section>
  );
};
