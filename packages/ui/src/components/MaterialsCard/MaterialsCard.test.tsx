import React from 'react';
import { render, screen } from '@testing-library/react';

import { MaterialsCard } from './MaterialsCard';

describe('MaterialsCard', () => {
  it('should renders correctly in idle status', () => {
    render(<MaterialsCard status="idle" />);

    const button = screen.getByText('Wygeneruj listę');
    expect(button).toBeEnabled();

    expect(button).toBeInTheDocument();
  });
  it('should renders correctly in loading status', () => {
    render(<MaterialsCard status="loading" />);

    const button = screen.getByText('Generowanie listy...');
    expect(button).toBeDisabled();

    expect(button).toBeInTheDocument();
  });
  it('should renders correctly in generated status', () => {
    render(<MaterialsCard status="generated" />);

    const button = screen.getByText('Przejdź do listy materiałów');
    expect(button).toBeEnabled();

    expect(button).toBeInTheDocument();
  });
});
