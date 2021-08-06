import React from 'react';
import { render, screen } from '@testing-library/react';

import { SliderSteps } from './SliderSteps';

describe('SliderSteps', () => {
  it('renders given number of steps correctly with one selected step', () => {
    const givenStepsCount = 9;

    render(<SliderSteps count={givenStepsCount} selectedIdx={0} onChangeIdx={() => {}} />);

    expect(screen.getAllByTestId('baseSliderStep').length).toEqual(givenStepsCount - 1);
    expect(screen.getAllByTestId('currentSliderStep').length).toEqual(1);
  });
});
