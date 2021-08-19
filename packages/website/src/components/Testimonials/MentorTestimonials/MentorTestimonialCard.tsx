import { Avatar } from '@coderscamp/ui/components/Avatar';
import { Center } from '@coderscamp/ui/components/Center';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { Testimonial } from '../Testimonials.data';

export const MentorTestimonialCard = ({ content, image, name, company, companyPosition }: Testimonial) => {
  return (
    <VStack spacing="32px" textAlign="center">
      <Typography size={{ base: 'md', sm: 'lg' }} color="gray.700">
        {content}
      </Typography>
      <Center>
        <Avatar src={image} size="lg" mr="16px" />
        <VStack alignItems="flex-start" spacing="0px">
          <Typography size="lg" weight="medium" color="gray.900">
            {name}
          </Typography>
          <Typography size="md" color="gray.500">
            {companyPosition}
          </Typography>
          <Typography size="md" color="gray.500">
            {company}
          </Typography>
        </VStack>
      </Center>
    </VStack>
  );
};
