import { SimpleGrid } from '@coderscamp/ui/components/SimpleGrid';
import { Typography } from '@coderscamp/ui/components/Typography';

import { Section } from '../Section';
import { MentorProfits } from './MentorProfits.data';
import { ProfitDescription } from './ProfitDescription';

export const AboutMentor = () => (
  <Section spacing="32px">
    <Typography size={{ base: '4xl', sm: '6xl' }} weight="extrabold" textAlign="center">
      Mentor, czyli kto?
    </Typography>
    <Typography size="lg" color="gray.700" pb="24px" textAlign="center">
      Mentor to najważniejsza osoba z perspektywy każdego uczestnika CodersCamp. Jego rolą jest prowadzenie zespołu
      składającego się z sześciu uczestników przez wszystkie wyzwania, jakie napotkają podczas kursu. Najprościej
      mówiąc, mentor to doświadczony programista, który pomaga członkom swojego zespołu postawić pierwsze kroki w branży
      IT. Do Twoich najważniejszych zadań w tej roli należałoby:
    </Typography>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="32px">
      {MentorProfits.map((profits) => (
        <ProfitDescription key={profits.title} {...profits} />
      ))}
    </SimpleGrid>
  </Section>
);
