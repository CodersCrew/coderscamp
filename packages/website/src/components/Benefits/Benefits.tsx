import { BenefitCard, BenefitCardProps } from '@coderscamp/ui/components/BenefitCard';
import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Grid } from '@coderscamp/ui/components/Grid';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidArrowDownIcon } from '@coderscamp/ui/icons';

export interface BenefitsProps {
  title: string;
  benefitItems: BenefitCardProps[];
  showExpandProfitButton?: boolean;
}

export const Benefits = ({ title, benefitItems, showExpandProfitButton = false }: BenefitsProps) => {
  const columnsCount = useBreakpointValue({ base: 1, md: 2, xl: 3 } as const);
  const profitButtonSize = useBreakpointValue({ base: 'sm', md: 'lg' } as const);

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
        {benefitItems.map(({ ...props }) => (
          <BenefitCard key={props.title} {...props} />
        ))}
      </Grid>
      {showExpandProfitButton && (
        <Button mt="48px" size={profitButtonSize} color="brand" icon={<SolidArrowDownIcon />}>
          Rozwiń listę zalet CodersCamp
        </Button>
      )}
    </Center>
  );
};
