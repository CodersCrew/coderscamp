import { Flex } from '@coderscamp/ui/components/Flex';
import { VStack } from '@coderscamp/ui/components/Stack';
import { Typography } from '@coderscamp/ui/components/Typography';

import { MentorProfits } from './MentorProfits.data';
import { ProfitDescription } from './ProfitDescription';

export const AboutMentor = () => (
  <VStack
    pt={{ base: '30px', sm: '60px', md: '120px' }}
    pb={{ base: '40px', sm: '80px', md: '160px' }}
    mx={{ base: '30px', xl: 'auto' }}
    maxW="min(1280px, 100%)"
    spacing="32px"
    textAlign="center"
  >
    <Typography size={{ base: '4xl', sm: '6xl' }} weight="extrabold">
      Mentor, czyli kto?
    </Typography>
    <Typography size="lg" color="gray.700" pb="24px">
      Mentor to najważniejsza osoba z perspektywy każdego uczestnika CodersCamp. Jego rolą jest prowadzenie zespołu
      składającego się z sześciu uczestników przez wszystkie wyzwania, jakie napotkają podczas kursu. Najprościej
      mówiąc, mentor to doświadczony programista, który pomaga członkom swojego zespołu postawić pierwsze kroki w branży
      IT. Do Twoich najważniejszych zadań w tej roli należałoby:
    </Typography>
    <Flex flexWrap="wrap" justifyContent="space-between">
      {MentorProfits.map((profits) => (
        <ProfitDescription key={profits.title} width={{ base: '100%', md: '48%' }} pb="32px" {...profits} />
      ))}
    </Flex>
  </VStack>
);
