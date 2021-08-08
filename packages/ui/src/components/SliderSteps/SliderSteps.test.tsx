import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { SliderSteps } from './SliderSteps';

describe('SliderSteps', () => {
  const givenStepsCount = 5;
  const lastDotIndex = givenStepsCount - 1;
  const selectedIndex = 2;

  const TestSliderComponent = ({ startSelectedIndex }: { startSelectedIndex: number }) => {
    const [selected, setSelectedIndex] = useState(startSelectedIndex);

    return <SliderSteps count={givenStepsCount} selectedIndex={selected} onChange={setSelectedIndex} />;
  };

  const getSelectedDotIndex = () =>
    screen.getAllByRole('tab').findIndex((x) => x.getAttribute('aria-selected') === 'true');

  const fireButtonClick = (buttonLabel: string) => {
    const button = screen.getByLabelText(buttonLabel);

    fireEvent.click(button);
  };

  it('renders given number of steps correctly with one selected step', () => {
    render(<TestSliderComponent startSelectedIndex={selectedIndex} />);

    expect(screen.getAllByRole('tab').length).toEqual(givenStepsCount);
    expect(screen.getAllByRole('tab', { selected: true }).length).toEqual(1);
  });

  it('has selected index on given position', () => {
    render(<TestSliderComponent startSelectedIndex={selectedIndex} />);

    expect(getSelectedDotIndex()).toEqual(selectedIndex);
  });

  it('should increase by one current dot after click forward button', () => {
    render(<TestSliderComponent startSelectedIndex={selectedIndex} />);

    fireButtonClick('go forward button');

    expect(getSelectedDotIndex()).toEqual(selectedIndex + 1);
  });

  it('should decrease by one current dot after click back button', () => {
    render(<TestSliderComponent startSelectedIndex={selectedIndex} />);
    fireButtonClick('go back button');

    expect(getSelectedDotIndex()).toEqual(selectedIndex - 1);
  });

  it('should select first dot after click forward button when last dot is selected', () => {
    render(<TestSliderComponent startSelectedIndex={lastDotIndex} />);
    fireButtonClick('go forward button');

    expect(getSelectedDotIndex()).toEqual(0);
  });

  it('should select last dot after click back button when first dot is selected', () => {
    render(<TestSliderComponent startSelectedIndex={0} />);
    fireButtonClick('go back button');

    expect(getSelectedDotIndex()).toEqual(lastDotIndex);
  });

  it('throws exception if component pass selectedIndex as negative number or grater than rendered dots', () => {
    const err = console.error;

    console.error = jest.fn();

    expect(() => render(<SliderSteps count={givenStepsCount} selectedIndex={-1} onChange={() => {}} />)).toThrow();

    expect(() => render(<SliderSteps count={givenStepsCount} selectedIndex={10} onChange={() => {}} />)).toThrow();

    console.error = err;
  });
});
