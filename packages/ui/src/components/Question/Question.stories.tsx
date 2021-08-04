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

const ARGS = [
  {
    title: 'Dolor mi amet sed feugiat at?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
    id: 1,
  },
  {
    title: 'Dolor mi amet sed feugiat at?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
    id: 2,
  },
  {
    title: 'Dolor mi amet sed feugiat at?',
    content:
      'Quam mattis ut nec amet, eget quisque. Lectus in ac orci magna euismod velit. Aenean pellentesque gravida ac gravida sit.',
    id: 3,
  },
];

Playground.args = {
  items: ARGS,
};

export const Expanded = () => <QuestionsAccordion items={ARGS} />;
