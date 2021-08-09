import React from 'react';
import { render, screen } from '@testing-library/react';

import { SolidGitHubIcon } from '../../icons';
import { BenefitCard } from './BenefitCard';

describe('BenefitCard', () => {
  it('renders correctly', () => {
    const title = 'Push to Deploy';
    const subtitle = 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.';

    render(<BenefitCard icon={<SolidGitHubIcon data-testid="icon" />} title={title} subtitle={subtitle} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });
});
