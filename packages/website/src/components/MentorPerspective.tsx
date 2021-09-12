import { Button } from '@coderscamp/ui/components/Button';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { SolidBookIcon } from '@coderscamp/ui/icons/SolidBook';

import { MENTORS_GUIDE_URL } from '@/constants';

import { Section } from './Section';

export const MentorPerspective = () => {
  const downloadSize = useBreakpointValue({ base: 'md', sm: 'md', md: 'lg' } as const, 'base');

  return (
    <Section spacing="32px" backgroundColor="gray.50">
      <Typography as="h2" textAlign="center" size="4xl" weight="extrabold" color="gray.900">
        CodersCamp z perspektywy mentora
      </Typography>
      <VStack spacing="40px">
        <Typography textAlign="center" weight="normal" size="lg" color="gray.500">
          Jeżeli chcesz już teraz w szczegółach dowiedzieć się, z jakimi wyzwaniami spotkasz się jako mentor, możesz
          zapoznać się z naszym pełnym poradnikiem dla mentorów, klikając przycisk poniżej.
        </Typography>
        <Button as="a" href={MENTORS_GUIDE_URL} size={downloadSize} color="brand" icon={<SolidBookIcon />}>
          Zobacz poradnik dla mentorów
        </Button>
      </VStack>
    </Section>
  );
};
