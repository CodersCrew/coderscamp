import React from 'react';
import { render, screen } from '@testing-library/react';

import { Requirement } from './Requirement';

const content =
  'Maecenas cum vel amet, massa etiam nisi. Sed id vulputate nisl adipiscing senectus. Id in urna varius dignissim.';

describe('Requirement', () => {
  it('renders correctly', () => {
    render(<Requirement>{content}</Requirement>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
