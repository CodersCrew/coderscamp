import React from 'react';
import { Meta, Story } from '@storybook/react';

import { QuestionsAccordion, QuestionsAccordionProps } from './QuestionsAccordion';

const meta: Meta = {
  title: 'Components / Question',
  component: QuestionsAccordion,
};

export default meta;

const Template: Story<QuestionsAccordionProps> = (args: QuestionsAccordionProps) => <QuestionsAccordion {...args} />;

export const Playground = Template.bind({});

const args = [
  {
    title: 'Dolor mi amet sed feugiat at?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
  },
  {
    title: 'Nibh sit nulla mollis pretium?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
  },
  {
    title: 'Egestas semper accumsan, sit accumsan aliquam volutpat amet arcu nisi?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
  },
];

Playground.args = {
  questions: args,
};
