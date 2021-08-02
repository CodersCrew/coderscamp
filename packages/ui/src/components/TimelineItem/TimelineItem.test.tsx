import React from 'react';
import { render, screen } from '@testing-library/react';

import { TimelineItem } from './TimelineItem';

describe('TimelineItem', () => {
  it('test component render properly', () => {
    const text = 'Lorem ipsum';

    render(<TimelineItem step={0} date="24.10-11.11.2021" information="lorem ipsum " />);

    const typography = screen.getByText(text);

    expect(typography).toBeInTheDocument();
  });
});
