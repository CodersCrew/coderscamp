import React from 'react';
import { render, screen } from '@testing-library/react';

import { CourseProgressCard } from './CourseProgressCard';

const status = [
  {
    name: 'Materiały',
    value: 50,
    max: 120,
  },
  {
    name: 'Testy',
    value: 2,
    max: 6,
  },
  {
    name: 'Projekty',
    value: 1,
    max: 6,
  },
];

describe('CourseProgressCard', () => {
  it('renders correctly', () => {
    render(<CourseProgressCard stats={status} />);
    expect(screen.getByText('Materiały')).toBeInTheDocument();
    expect(screen.getByText('Testy')).toBeInTheDocument();
    expect(screen.getByText('Projekty')).toBeInTheDocument();
    expect(screen.getByText('(50/120)')).toBeInTheDocument();
    expect(screen.getByText('(2/6)')).toBeInTheDocument();
    expect(screen.getByText('(1/6)')).toBeInTheDocument();
  });
});
