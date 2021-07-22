import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProjectCard } from './ProjectCard';

const title = 'Zaawansowany React i Node';
const date = new Date();
const statusArray = [
  { status: 'idle' as const, text: 'Nie rozpoczęty' },
  { status: 'doing' as const, text: 'W trakcie' },
  { status: 'review' as const, text: 'W ocenie' },
  { status: 'done' as const, text: 'Zakończony' },
];

describe('ProjectCard', () => {
  statusArray.map((el) => {
    return it(`if status is equal to${el.status} should display ${el.text}`, () => {
      if (el.status === 'done') {
        render(<ProjectCard status="done" image="test" title={title} url="test" points={100} pointsMax={200} />);
      } else {
        render(<ProjectCard status={el.status} image="test" title={title} url="test" date={date} />);
      }

      expect(screen.getByText(el.text)).toBeInTheDocument();
    });
  });
  it('should have button disabled if status is equal to idle', () => {
    render(<ProjectCard status="idle" image="test" title={title} url="test" date={date} />);
    const button = screen.getByRole('button', { name: 'Przejdź do projektu' });
    expect(button).toBeDisabled();
  });

  it('should display points when status is equal to done', () => {
    render(<ProjectCard status="done" image="test" title={title} url="test" points={100} pointsMax={200} />);
    expect(screen.getByText('100/200')).toBeInTheDocument();
  });
});
