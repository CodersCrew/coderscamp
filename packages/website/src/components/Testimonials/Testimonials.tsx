import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from '../Section';

export interface TestimonialsProps {
  title: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ title, children }) => {
  return (
    <Section bg="gray.50" spacing={{ base: '32px', sm: '64px' }}>
      <Typography textAlign="center" size="4xl" color="gray.900" weight="extrabold">
        {title}
      </Typography>
      {children}
    </Section>
  );
};
