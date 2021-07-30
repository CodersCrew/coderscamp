import React from 'react';
import { render, screen } from '@testing-library/react';

import { MaterialsCard, MaterialsCardText } from './MaterialsCard';

describe('MaterialsCard', () => {
  it('should renders correctly in idle status', () => {
    render(<MaterialsCard status="idle" />);

    const button = screen.getByText(MaterialsCardText.idle.buttonText);

    expect(button).toBeEnabled();

    expect(button).toBeInTheDocument();
  });

  it('should renders correctly in loading status', () => {
    render(<MaterialsCard status="loading" />);

    const button = screen.getByText(MaterialsCardText.loading.buttonText);

    expect(button).toBeDisabled();

    expect(button).toBeInTheDocument();
  });

  it('should renders correctly in generated status', () => {
    render(<MaterialsCard status="generated" />);

    const button = screen.getByText(MaterialsCardText.generated.buttonText);

    expect(button).toBeEnabled();

    expect(button).toBeInTheDocument();
  });
});
