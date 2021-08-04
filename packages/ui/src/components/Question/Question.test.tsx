import React from 'react';
import { render, screen } from '@testing-library/react';

import { QuestionsAccordion } from './QuestionsAccordion';

const item = {
  id: 1,
  title: 'Tellus mauris vulputate fermentum sed elementum ut nibh massa ultrices?',
  content:
    'Maecenas cum vel amet, massa etiam nisi. Nisi rhoncus mi volutpat varius at. Pharetra commodo porttitor sapien, nibh cras elementum tellus rutrum. Fringilla nunc accumsan imperdiet nisl, nunc eleifend diam morbi. Donec congue faucibus commodo, elit malesuada cras faucibus. Ut elit, egestas arcu, et eu diam. Nibh egestas netus at vitae nibh sagittis, vitae eget. Amet, magna augue in mauris tristique quisque quam. Urna, amet elementum elit erat in. Enim cum accumsan, curabitur augue blandit. Sed id vulputate nisl adipiscing senectus. Id in urna varius dignissim.',
};

describe('QuestionsAccordion', () => {
  it('renders correctly', () => {
    render(<QuestionsAccordion items={[item]} />);

    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.content)).not.toBeVisible();
  });
});
