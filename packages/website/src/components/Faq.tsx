import React from 'react';

import { Flex } from '@coderscamp/ui/components/Flex';
import { QuestionsAccordion } from '@coderscamp/ui/components/Question';
import { Typography } from '@coderscamp/ui/components/Typography';

const ITEMS = [
  {
    id: 1,
    title: 'Tellus mauris vulputate fermentum sed elementum ut nibh massa ultrices?',
    content:
      'Maecenas cum vel amet, massa etiam nisi. Nisi rhoncus mi volutpat varius at. Pharetra commodo porttitor sapien, nibh cras elementum tellus rutrum. Fringilla nunc accumsan imperdiet nisl, nunc eleifend diam morbi. Donec congue faucibus commodo, elit malesuada cras faucibus. Ut elit, egestas arcu, et eu diam. Nibh egestas netus at vitae nibh sagittis, vitae eget. Amet, magna augue in mauris tristique quisque quam. Urna, amet elementum elit erat in. Enim cum accumsan, curabitur augue blandit. Sed id vulputate nisl adipiscing senectus. Id in urna varius dignissim.',
  },
];

export const Faq = () => {
  const mainHeaderSize = { base: '4xl', md: '5xl', xl: '6xl' } as const;

  return (
    <Flex flexWrap="wrap" mx={{ base: '30px', xl: 'auto' }} justify="center" maxW="min(1280px, 100%)">
      <div style={{ width: '100%' }}>
        <Typography my={{ base: '32px', md: '64px' }} as="h1" size={mainHeaderSize} weight="bold" textAlign="center">
          Najczęściej zadawane pytania
        </Typography>
        <QuestionsAccordion items={ITEMS} />
      </div>
    </Flex>
  );
};
