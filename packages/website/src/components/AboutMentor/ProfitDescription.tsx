import { Flex, FlexProps } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

export interface ProfitDescriptionProps extends FlexProps {
  title: string;
  content: string;
}

export const ProfitDescription = ({ title, content, ...props }: ProfitDescriptionProps) => {
  return (
    <Flex flexDirection="column" {...props}>
      <Typography size="xl" weight="medium" color="gray.900">
        {title}
      </Typography>
      <Typography size="md" color="gray.500" margin="8px 0px">
        {content}
      </Typography>
    </Flex>
  );
};
