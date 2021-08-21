import { useState } from 'react';

import { BenefitCard, BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidArrowDownIcon, SolidArrowUpIcon } from '@coderscamp/ui/icons';

export interface BenefitsProps {
  title: string;
  benefitItems: BenefitCardProps[];
  showExpandProfitButton?: boolean;
}

const expandedProfitButton = {
  props: {
    position: 'sticky',
    bottom: '20px',
    icon: <SolidArrowUpIcon />,
  },
  text: 'Zwiń listę zalet CodersCamp',
} as const;
const rolledUpProfitButton = {
  props: {
    icon: <SolidArrowDownIcon />,
  },
  text: 'Rozwiń listę zalet CodersCamp',
} as const;

const NO_OF_SHRINKED_BENEFITS = 6;

export const Benefits = ({ title, benefitItems, showExpandProfitButton = false }: BenefitsProps) => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);
  const profitButtonSize = useBreakpointValue({ base: 'sm', md: 'lg' } as const);
  const [isExpanded, setIsExpanded] = useState(false);

  const profitButtonValues = isExpanded ? expandedProfitButton : rolledUpProfitButton;
  const handleProfitList = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayedBenefitItems =
    showExpandProfitButton && !isExpanded ? benefitItems.slice(0, NO_OF_SHRINKED_BENEFITS) : benefitItems;

  return (
    <Center
      flexDirection="column"
      bg="white"
      py={{ base: '40px', lg: '80px' }}
      px={{ base: '16px', sm: '32px', lg: '64px' }}
      textAlign="center"
    >
      <Typography
        size={{ base: '3xl', lg: '4xl' }}
        color="gray.900"
        weight="extrabold"
        mb={{ base: '80px', lg: '92px' }}
      >
        {title}
      </Typography>
      <Grid templateColumns={`repeat(${columnsCount}, 1fr)`} gap="64px 40px">
        {displayedBenefitItems.map((item) => (
          <BenefitCard key={item.title} {...item} />
        ))}
      </Grid>
      {showExpandProfitButton && (
        <Button
          mt="48px"
          size={profitButtonSize}
          color="brand"
          onClick={handleProfitList}
          {...profitButtonValues.props}
        >
          {profitButtonValues.text}
        </Button>
      )}
    </Center>
  );
};
