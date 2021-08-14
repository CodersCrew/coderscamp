import React from 'react';
import { render, screen } from '@testing-library/react';

import { CourseProgressCard } from './CourseProgressCard';
import { statsData } from './CourseProgressCard.mock';

describe('CourseProgressCard', () => {
  it('renders correctly', () => {
    render(<CourseProgressCard stats={statsData} />);
    expect(screen.getByText('Materiały')).toBeInTheDocument();
    expect(screen.getByText('Testy')).toBeInTheDocument();
    expect(screen.getByText('Projekty')).toBeInTheDocument();
    expect(screen.getByText('(50/120)')).toBeInTheDocument();
    expect(screen.getByText('(2/6)')).toBeInTheDocument();
    expect(screen.getByText('(1/6)')).toBeInTheDocument();
  });
});
