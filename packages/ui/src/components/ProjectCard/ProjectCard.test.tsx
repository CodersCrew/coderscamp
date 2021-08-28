import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProjectCard } from './ProjectCard';
import { PROJECT_CARD_TEXT } from './projectCardTypes';

const title = 'Zaawansowany React i Node';
const date = new Date();

describe('ProjectCard', () => {
  it('should display Nie rozpoczęty when status is equal to idle', () => {
    render(
      <ProjectCard
        status="idle"
        image="test"
        title={title}
        url="test"
        date={date}
        onButtonClick={(_url: string) => {}}
      />,
    );
    expect(screen.getByText(PROJECT_CARD_TEXT.idle.statusText)).toBeInTheDocument();
  });

  it('should display W trakcie when status is equal to doing', () => {
    render(
      <ProjectCard
        status="doing"
        image="test"
        title={title}
        url="test"
        date={date}
        onButtonClick={(_url: string) => {}}
      />,
    );
    expect(screen.getByText(PROJECT_CARD_TEXT.doing.statusText)).toBeInTheDocument();
  });

  it('should display W ocenie when status is equal to review', () => {
    render(
      <ProjectCard
        status="review"
        image="test"
        title={title}
        url="test"
        date={date}
        onButtonClick={(_url: string) => {}}
      />,
    );
    expect(screen.getByText(PROJECT_CARD_TEXT.review.statusText)).toBeInTheDocument();
  });

  it('should display Zakończony when status is equal to done', () => {
    render(
      <ProjectCard
        status="done"
        image="test"
        title={title}
        url="test"
        points={100}
        pointsMax={200}
        onButtonClick={(_url: string) => {}}
      />,
    );
    expect(screen.getByText(PROJECT_CARD_TEXT.done.statusText)).toBeInTheDocument();
  });

  it('should have button disabled if status is equal to idle', () => {
    render(
      <ProjectCard
        status="idle"
        image="test"
        title={title}
        url="test"
        date={date}
        onButtonClick={(_url: string) => {}}
      />,
    );

    const button = screen.getByRole('button', { name: 'Przejdź do projektu' });

    expect(button).toBeDisabled();
  });

  it('should display points when status is equal to done', () => {
    render(
      <ProjectCard
        status="done"
        image="test"
        title={title}
        url="test"
        points={100}
        pointsMax={200}
        onButtonClick={(_url: string) => {}}
      />,
    );
    expect(screen.getByText('100/200')).toBeInTheDocument();
  });
});
